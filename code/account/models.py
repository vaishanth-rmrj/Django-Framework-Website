import os
import uuid
from jsonfield.fields import JSONField
from django.db import models
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager
import datetime
from dateutil.relativedelta import *

from django.db.models.signals import post_save,pre_save
from django.dispatch import receiver
from django.db.models.signals import m2m_changed

# imports from inside the project
from engine.models import idya
from idyahub.models import idyahub, idyahubInfo

GENDER_CHOICES = (
		('Male','Male'),
		('Female','Female'),
		('Others','Others')
	)

CAREER_CHOICES = (
		('Studying','Studying'),
		('Working','Working'),
		('Business','Business'),
		('Entrepreneur','Entrepreneur'),
	)

def scramble_uploaded_filename(instance, filename):
    """
    Scramble / uglify the filename of the uploaded file, but keep the files extension (e.g., .jpg or .png)
    :param instance:
    :param filename:
    :return:
    """
    extension = filename.split(".")[-1]
    return "{}.{}".format(uuid.uuid4(), extension)

class ProfileManager(BaseUserManager):

    def create_user(self, first_name, last_name, email, password=None, **kwargs):
        if not email:
            raise ValueError('Please enter a valid email address')

        if not kwargs.get('username'):
            raise ValueError('Invalid username')

        profile = self.model(
            username=kwargs.get('username'),
            first_name=first_name,
            last_name=last_name,
            email=self.normalize_email(email),
        )

        profile.set_password(password)
        profile.save()

        return profile

    def create_superuser(self, first_name, last_name, email, password, **kwargs):
        account = self.create_user(first_name,last_name,email, password, **kwargs)

        account.is_admin = True
        account.is_staff = True
        account.save()

        return account
    

        def activate(self,**kwargs):
            profile = kwargs['instance']
            profile.is_active = True
            profile.save()

        def deactivate(self,**kwargs):
            profile = kwargs['instance']
            profile.is_active = False
            profile.save()

        

class Profile(AbstractBaseUser):
	username	= models.CharField(max_length=40,unique=True)
	first_name	= models.CharField(max_length=40,blank=False,null=False)
	last_name	= models.CharField(max_length=40,blank=False,null=False)
	email		= models.EmailField(max_length=100,unique=True)

	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)


	is_active		= models.BooleanField(default=True)
	is_admin = models.BooleanField(default=False)
	is_staff = models.BooleanField(default=False)
	# General details of the users
	image 		= models.ImageField(blank=True,upload_to='profilePic')
	bio 		= models.TextField(max_length=150,blank=True,null=True)
	dob 		= models.DateField(blank=True,null=True)
	age 		= models.PositiveIntegerField(default=0)
	gender 		= models.CharField(max_length=6,default='Male',choices=GENDER_CHOICES)

	# Career related details of the user
	career 		= models.CharField(max_length=15,blank=True,null=True,default='none',choices=CAREER_CHOICES)
	institution	= models.CharField(max_length=100,blank=True,null=True,default='none')
	job 		= models.CharField(max_length=100,blank=True,null=True,default='none')
	company		= models.CharField(max_length=100,blank=True,null=True,default='none')
	location	= models.CharField(max_length=100,blank=True,null=True,default='none')

	friendCount = models.PositiveIntegerField(default=0)
	score 	= models.IntegerField(default=0)
	idyaCount 	= models.PositiveIntegerField(default=0)

	last_login = models.DateTimeField(auto_now=True)

	USERNAME_FIELD = 'username'
	REQUIRED_FIELDS = ['first_name','last_name','email']

	objects = ProfileManager()

	def __str__(self):
		return self.username

	def get_full_name(self):
		return ' '.join([self.first_name, self.last_name])

	def get_short_name(self):
		return self.first_name

	@property
	def is_superuser(self):
		return self.is_admin

	@property
	def is_staff(self):
		return self.is_admin

	def has_perm(self, perm, obj=None):
		return self.is_admin

	def has_module_perms(self, app_label):
		return self.is_admin

	@is_staff.setter
	def is_staff(self, value):
		self._is_staff = value

class FriendManager(models.Manager):

	def accept_request(self, profile, requested):
		instance = Friend.objects.get(for_profile=profile)
		instance.friends.add(requested)
		instance.request.remove(requested)

		instance.save()

	def reject_request(self, profile, requested):
		instance = Friend.objects.get(for_profile=profile)
		instance.request.remove(requested)

		instance.save()


# model for list of friends for a profile
class Friend(models.Model):
	for_profile = models.ForeignKey(Profile, related_name="profileFriends", on_delete=models.CASCADE)
	friends = models.ManyToManyField(Profile, related_name="friendList", blank=True)
	request = models.ManyToManyField(Profile, related_name="friendRequest", blank=True)

	objects = FriendManager()


class SubscribedIdyahubManager(models.Manager):

	def accept_invite(self, profile, requested):
		instance = SubscribedIdyahub.objects.get(for_profile=profile)
		instance.hubs.add(requested)
		instance.invites.remove(requested)

		instance.save()

# model for list of subscribed hubs
class SubscribedIdyahub(models.Model):
	for_profile = models.ForeignKey(Profile,related_name="profile_subscribed_hubs",on_delete=models.CASCADE)
	hubs = models.ManyToManyField(idyahubInfo, related_name="subscribedHubs", blank=True)
	invites = models.ManyToManyField(idyahubInfo,blank=True)

	objects = SubscribedIdyahubManager()

# model for profile preferences
class Preference(models.Model):
	for_profile = models.ForeignKey(Profile,related_name="profile_preference",on_delete=models.CASCADE)
	favCategory = JSONField(blank=True, null=True)

class idyaBookmark(models.Model):
	for_profile = models.ForeignKey(Profile,related_name="profileIdyaBookmarks",on_delete=models.CASCADE)
	bookmarked_idyas = models.ManyToManyField(idya,related_name='bookmarks',blank=False)

	def __str__(self):
		return "{} bookmarked {} idyas".format(self.for_profile, self.bookmarked_idyas.all().count())