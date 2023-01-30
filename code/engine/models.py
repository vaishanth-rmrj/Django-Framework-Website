import os
import uuid
from django.utils import timezone

from django.db import models
from django.conf import settings

from idyahub.models import idyahub, idyahubInfo
from channel.models import Channel


CATEGORY_CHOICES = {
	('Category','Category'),
	('Others','Others'),
	('Technology ','Technology '),
	('Science ', 'Science '),
	('Movies ', 'Movies '),
	('Music ', 'Music '),
	('Health', 'Health'),
	('Books ', 'Books '),
	('Food ', 'Food '),
	('Travel ', 'Travel '),
	('Business ', 'Business '),
	('Psychology ', 'Psychology '),
	('History ', 'History '),
	('Cooking ', 'Cooking '),
	('Design ','Design '),
	('Fashion and Style','Fashion and Style'),
	('Economics  ', 'Economics  '),
	('Philosophy  ', 'Philosophy  '),
	('Finance  ', 'Finance  '),
	('Marketing  ', 'Marketing  '),
	('Politics  ', 'Politics  '),
	('Television Series ', 'Television Series '),
	('Entertainment  ', 'Entertainment  '),
	('Literature  ', 'Literature  '),
	('Journalism  ', 'Journalism  '),
	('Physics  ', 'Physics  '),
	('Science of Everyday Life ', 'Science of Everyday Life '),
	('Nutrition  ', 'Nutrition  '),
	('Entrepreneurship  ', 'Entrepreneurship  '),
	('Startups  ', 'Startups  '),
	('Biology  ', 'Biology  '),
	('Recipes  ', 'Recipes  '),
	('Research  ', 'Research  '),
	('Fiction  ', 'Fiction  '),
	('Computer Programming ', 'Computer Programming '),
	('Neuroscience  ', 'Neuroscience  '),
	('Web Design ', 'Web Design '),
	('Web Development ', 'Web Development '),
	('Jobs and Careers ', 'Jobs and Careers '),
	('Learning New Things ', 'Learning New Things '),
	('Engineering  ', 'Engineering  '),
	('Studying  ', 'Studying  '),
	('Innovation  ', 'Innovation  '),
	('Government  ', 'Government  '),
	('Dating and Relationships ', 'Dating and Relationships '),
	('Astronomy  ', 'Astronomy  '),
	('Career Advice ', 'Career Advice '),
	('Blogs  ', 'Blogs  '),
	('Colleges and Universities ', 'Colleges and Universities '),
	('Friendship  ', 'Friendship  '),
}

IDYA_TYPE_CHOICES = (
    ('iLog', 'iLog'),
    ('iMage', 'iMage'),
    ('iVideo', 'iVideo'),
)

def scramble_uploaded_filename(instance, filename):
    """
    Scramble / uglify the filename of the uploaded file, but keep the files extension (e.g., .jpg or .png)
    """
    extension = filename.split(".")[-1]
    return "{}.{}".format(uuid.uuid4(), extension)

class idyaManager(models.Manager):
	def all(self,*args,**kwargs):
		return super(idyaManager,self).filter(draft=False)

class idya (models.Model):
	channel 	= models.ForeignKey(Channel, on_delete=None)
	idyatype 	= models.CharField(
      								max_length=7,
	        						choices=IDYA_TYPE_CHOICES,
	        						default='iLog',
    								)
	slug 		= models.SlugField(max_length=250,unique=True)
	category 	= models.CharField(max_length=50,choices=CATEGORY_CHOICES,default='Category')

	created_at 	= models.DateTimeField(auto_now_add=True)
	updated_at 	= models.DateTimeField(auto_now=True)
	is_draft 	= models.BooleanField(default=False)

	title 		= models.CharField(max_length=150,null=False,blank=False)

	post 		= models.TextField(blank=True, null=True)

	image 		= models.ImageField("Uploaded image",upload_to=scramble_uploaded_filename,blank=True, null=True)

	videoUrl	= models.URLField(blank=True, null=True)
	
	likeCount	= models.PositiveIntegerField(default=0)
	dislikeCount = models.PositiveIntegerField(default=0)
	views 		= models.PositiveIntegerField(default=0)

	class Meta:
		verbose_name = "idya"
		ordering = ['-created_at']

	def __str__(self):
		return self.idyatype + ' - ' + self.title 

class idyaLike(models.Model):
	for_idya = models.ForeignKey(idya,on_delete=models.CASCADE)
	likedProfile = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='idya_liked_profile', blank=True)
	dislikedProfile = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='idya_disliked_profile', blank=True)

	def __str__(self):
		return '{} - Likes - {}- Dislikes - {}'.format(self.for_idya.title, self.likedProfile.count(), self.dislikedProfile.count())

class idyaViewed(models.Model):
	for_idya = models.ForeignKey(idya,on_delete=models.CASCADE)
	viewedProfile = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='idyaViews', blank=True)

	def __str__(self):
		return '{} - views - {}'.format(self.for_idya.title, self.viewedProfile.count())

class Category(models.Model):
    category = models.CharField(max_length=255, verbose_name="category")
    idya 		= models.ManyToManyField(idya, related_name='idyaUnderThisCategory', blank=True)

    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created at")

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"
        ordering = ['category']

    def __str__(self):
        return self.category