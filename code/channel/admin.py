from django.contrib import admin

from channel.models import Channel, SubscribedChannel
# Register your models here.

admin.site.register(Channel)
admin.site.register(SubscribedChannel)