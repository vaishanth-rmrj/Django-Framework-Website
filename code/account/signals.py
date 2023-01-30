import datetime
from dateutil.relativedelta import *
from django.db.models.signals import post_save,pre_save,m2m_changed
from django.dispatch import receiver

from .models import Profile,Friend,SubscribedIdyahub

@receiver(pre_save, sender=Profile)
def updatedProfileField(sender, **kwargs):
    profile = kwargs["instance"]
    today = datetime.datetime.utcnow().date()		

    # Get the difference between the current date and the birthday
    age = relativedelta(today, profile.dob)
    profile.age = age.years


@receiver(post_save, sender=Profile)
def profilePostSave(sender, created, **kwargs):
	print("profilePostSave")
	instance = kwargs['instance']
	if created:
		Friend.objects.create(for_profile=instance)
		SubscribedIdyahub.objects.create(for_profile=instance)
    

def friendCountChanged(sender, **kwargs):
	print("friendCountChanged")
	instance = kwargs['instance']
	profile = instance.for_profile
	profile.friendCount = instance.friends.all().count()
	profile.save()	

m2m_changed.connect(friendCountChanged, sender=Friend.friends.through)