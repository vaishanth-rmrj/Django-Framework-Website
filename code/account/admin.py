from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# imports from inside the project
from account.models import Profile, Friend, SubscribedIdyahub, Preference, idyaBookmark


class ProfileAdmin(BaseUserAdmin):

	list_display = ('username','email','is_admin','is_active','friendCount','idyaCount','score')
	list_filter = ('is_admin',)

	fieldsets = (
			(None, {'fields': ('username','first_name','last_name','email','password')}),
			('Permissions', {'fields': ('is_admin','is_active')}),
			('Profile Info', {'fields': ('image','bio','gender','dob','age','career','institution','job','company','location')}),
			('Profile Status', {'fields': ('friendCount','score','idyaCount')}),
		)
	search_fields = ('username','email')
	ordering = ('username','email')

	filter_horizontal = ()

admin.site.register(Profile, ProfileAdmin)


class FriendAdmin(admin.ModelAdmin):

	list_display = ('for_profile',)
	list_filter = ('for_profile',)

	fieldsets = (
			('Profile Friend List', {'fields': ('for_profile','friends')}),	
			('Friend Request', {'fields': ('request',)}),		
		)
	search_fields = ('for_profile',)
	ordering = ('for_profile',)

	filter_horizontal = ()


admin.site.register(Friend, FriendAdmin)

class SubscribedIdyahubAdmin(admin.ModelAdmin):

	list_display = ('for_profile',)
	list_filter = ('for_profile',)

	fieldsets = (
			('Subscribed idyahubs', {'fields': ('for_profile','hubs')}),	
			('Hub invites', {'fields': ('invites',)}),		
		)
	search_fields = ('for_profile',)
	ordering = ('for_profile',)

	filter_horizontal = ()


admin.site.register(SubscribedIdyahub, SubscribedIdyahubAdmin)

admin.site.register(Preference)

admin.site.register(idyaBookmark)

admin.site.unregister(Group)