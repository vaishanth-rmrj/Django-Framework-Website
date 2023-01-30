PROBLEM 1:
In settings.py for installing apps use
	'account.apps.AccountConfig',
instead of
	'account.apps',(it gives an error of app not found)


PROBLEM 2:
ERRORS:
<class 'account.admin.ProfileAdmin'>: (admin.E008) The value of 'fieldsets[4][1]['fields']' must be a list or tuple.

solution: ('Activity', {'fields': ('last_login',)}),



PROBLEM 3:
Got AttributeError when attempting to get a value for field `username` on serializer `ProfileSerializer`.
The serializer field might be named incorrectly and not match any attribute or key on the `QuerySet` instance.
Original exception text was: 'QuerySet' object has no attribute 'username'.

solution: serialized = ProfileSerializer(fetchedProfile, many=True)



PROBLEM 4:
Creating a custom user model for django above 2.0

then u must drop the USER model table
for that u create a custom model at the start even before you make initial migrations
and then migrate to create a database



PROBLEM 5:
For signals to work properly
add the below code to init.py
default_app_config = 'account.apps.AccountConfig'

in apps.py

class AccountConfig(AppConfig):
    name = 'account'

    def ready(self):
    	import account.signals

example
@receiver(post_save, sender=Friend)
def updatedProfileField(sender, kwargs):
    instance = kwargs["instance"] 
    profile = instance.for_profile
    profile.friendCount = instance.friend_count
    profile.save()

get the model instace by using the foreign key field itself



PROBLEM 6:
django signals m2m changed

def friendCountChanged(sender, kwargs):
	instance = kwargs['instance']
	profile = instance.for_profile
	profile.friendCount = instance.friends.all().count()
	profile.save()	

m2m_changed.connect(friendCountChanged, sender=Friend.friends.through)

list of kwargs
{'signal': <django.db.models.signals.ModelSignal object at 0x000001B07A4B25F8>, 
'action': 'pre_remove', 'instance': <Friend: Friend object (2)>, 
'reverse': False, 
'model': <class 'account.models.Profile'>, 
	'pk_set': {1}, 
	'using': 'default'}