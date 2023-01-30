from PIL import Image

from django.db.models.signals import post_save,pre_save
from django.dispatch import receiver
from django.core.files import File
from django.core.files.storage import Storage

from engine.models import idya, idyaLike, idyaViewed


@receiver(post_save, sender=idya)
def createIdyaLikeModel(sender,created, **kwargs):
    print("optimizing image")
    instance = kwargs["instance"]
    if created and instance.image:
        img = instance.image
        path = File(img).name
        iMage = Image.open(img)
        iMage.resize((128,128),Image.ANTIALIAS)
        iMage.save(path,quality=40)
        print("image optimized")

