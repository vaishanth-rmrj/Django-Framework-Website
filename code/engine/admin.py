from django.contrib import admin

from engine.models import idya, idyaLike, idyaViewed, Category

# class idyaAdmin(admin.ModelAdmin):

# 	list_display = ('profile','idyatype','title','from_hub','created_at','likeCount','dislikeCount','views')
# 	list_filter = ('created_at','likeCount','dislikeCount','views')

# 	fieldsets = (
# 			('idya', {'fields': ('profile','idyatype','title','slug','category','from_hub','is_draft')}),	
# 			('if iLOG', {'fields': ('post',)}),
# 			('if iMage', {'fields': ('image',)}),
# 			('if iVideo', {'fields': ('videoUrl',)}),
# 			('status', {'fields': ('likeCount','dislikeCount','views')}),		
# 		)

# 	readonly_fields = ('slug','likeCount', 'dislikeCount','views')
# 	radio_fields = ({'idyatype': admin.HORIZONTAL})
# 	search_fields = ('user','title','from_hub')
# 	ordering = ('title',)

# 	filter_horizontal = ()


admin.site.register(idya)

admin.site.register(idyaLike)

admin.site.register(idyaViewed)

admin.site.register(Category)