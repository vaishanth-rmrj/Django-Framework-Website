from django.contrib import admin

from .models import idyahubInfo, idyahub, idyahubActivity, SharedIdya


admin.site.register(idyahubInfo)

admin.site.register(idyahub)

admin.site.register(idyahubActivity)

admin.site.register(SharedIdya)