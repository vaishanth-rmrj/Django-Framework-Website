from django.db.models.signals import post_save,pre_save,m2m_changed
from django.dispatch import receiver

from .models import idyahub, idyahubInfo, idyahubActivity

@receiver(post_save, sender=idyahubInfo)
def createIdyaHubModel(sender,created, **kwargs):
    print("idyahub model creation signal working")
    hubinfo = kwargs["instance"]
    if created:
        idyahub.objects.create(hubInfo=hubinfo)