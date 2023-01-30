from django.db.models.signals import post_save,pre_save,m2m_changed
from django.dispatch import receiver
from django.utils.text import slugify

from .models import idya, idyaLike, idyaViewed
from idyahub.models import idyahub, idyahubInfo
from channel.models import Channel

@receiver(pre_save, sender=idya)
def updateSlugField(sender,instance,**kwargs):
	print("slug update signal working")
	slug 	= slugify(instance.title)
	exists 	= idya.objects.filter(slug=slug).exists()
	if exists:
		slug = "%s-%s" %(slug,instance.id)
	instance.slug = slug

@receiver(post_save, sender=idya)
def createIdyaLikeModel(sender,created, **kwargs):
    print("idyaLike model creation signal working")
    idya = kwargs["instance"]
    if created:
        idyaLike.objects.create(for_idya=idya)
        idyaViewed.objects.create(for_idya=idya)
        channel = idya.channel
        channel.idyas.add(idya)
        channel.idyasCount = channel.idyasCount + 1
        channel.save()

@receiver(m2m_changed, sender=idyaLike.likedProfile.through)
def updateIdyaLikeCount(sender, **kwargs):
	print("idyalikedcount changed")
	instance = kwargs['instance']
	idya = instance.for_idya
	idya.likeCount = instance.likedProfile.all().count()
	idya.save()

@receiver(m2m_changed, sender=idyaLike.dislikedProfile.through)
def updateIdyaDislikeCount(sender, **kwargs):
	print("idyadislikedcount changed")
	instance = kwargs['instance']
	idya = instance.for_idya
	idya.dislikeCount = instance.dislikedProfile.all().count()
	idya.save()

@receiver(m2m_changed, sender=idyaViewed.viewedProfile.through)
def updateIdyaViewsCount(sender, **kwargs):
	print("views count changed")
	instance = kwargs['instance']
	idya = instance.for_idya
	idya.views = instance.viewedProfile.all().count()
	idya.save()