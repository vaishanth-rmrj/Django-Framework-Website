from django.db import models
from django.conf import settings

# from qna.models import Question

class idyahubInfo(models.Model):
	hubName = models.CharField(max_length=50,blank=False,unique=True)
	hubPic = models.ImageField(blank=True,upload_to='hubPic')
	description = models.TextField(max_length=500,null=True,blank=True)

	memberCount = models.PositiveIntegerField(default=0)
	idyaCount = models.PositiveIntegerField(default=0)

	created_at = models.DateTimeField(auto_now_add=True)
	
	def __str__(self):
		return self.hubName
class idyahubManager(models.Manager):

	def fetcHubIdyas(self, name):
		collectHubInfo = idyahubInfo.objects.get(hubName= name)
		fetchedHub = idyahub.objects.get(hubInfo= collectHubInfo)
		return fetchedHub.hubIdyas

class idyahub(models.Model):
	hubInfo	=	models.ForeignKey(idyahubInfo, on_delete=None)	
	is_active = models.BooleanField(default=False)
	hubAdmin = models.ManyToManyField(settings.AUTH_USER_MODEL,related_name="hubAdmin", blank=False)
	members = models.ManyToManyField(settings.AUTH_USER_MODEL,related_name="hubMembers", blank=True)
	
	# hub contents
	shared_idya = models.ManyToManyField('idyahub.SharedIdya', related_name="hubIdyas", blank=True)
	question	= models.ManyToManyField('qna.Question', related_name="hubQuestion", blank=True)
	objects = idyahubManager()

	def __str__(self):
		return self.hubInfo.hubName

class idyahubActivity(models.Model):
	activeMembers = models.ManyToManyField(settings.AUTH_USER_MODEL,blank=True)
	
class SharedIdya(models.Model):
	shared_by 	= models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	hub 		= models.ForeignKey(idyahubInfo, on_delete=models.CASCADE)
	idya 		= models.OneToOneField('engine.idya', on_delete=models.CASCADE,  blank=False)
	likes		= models.ManyToManyField(settings.AUTH_USER_MODEL,related_name="likesForsharedIdya", blank=True)
	likes_count	= models.PositiveIntegerField(default=0)	

	created_at = models.DateTimeField(auto_now_add=True)