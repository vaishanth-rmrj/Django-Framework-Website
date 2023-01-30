from django.db import models
from django.conf import settings 

# from engine.models import idya
# model for the channel
class ChannelManager(models.Manager):
	def all(self,*args,**kwargs):
		return super(ChannelManager,self).filter(active=False)

class Channel(models.Model):
	user	= models.ForeignKey(settings.AUTH_USER_MODEL, related_name="channel_user", on_delete=None)
	name    = models.CharField(max_length=25)
	picture = models.ImageField(blank=True,upload_to='channels/channel_picture')
	description = models.CharField(max_length=60,blank=True,null=True)
	
	subscribers = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='channel_subscribers', blank=True)
	subscribers_count = models.PositiveIntegerField(default=0)

	#channel idyas posted
	idyas 	= models.ManyToManyField('engine.idya',related_name="channel_posted_idyas",blank=True)
	idyasCount = models.PositiveIntegerField(default=0)

	#channel status
	active 		= models.BooleanField(default=True)

	#channel history
	created_at 	= models.DateTimeField(auto_now_add=True)

	class Meta:
		verbose_name = "Channel"
		ordering = ['-subscribers_count']

	def __str__(self):
		return self.name

class SubscribedChannel(models.Model):
	for_profile = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="profile_Subscribing", on_delete=None)
	channels = models.ManyToManyField(Channel,related_name="subscribedChannels",blank=True)