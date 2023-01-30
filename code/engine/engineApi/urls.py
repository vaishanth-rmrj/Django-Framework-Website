from django.conf.urls import url

from .views import (idyaView, PersonalizedIdyaFeed, ProfileIdyas, 
					idyaLikeView, idyaViewedView, fetchIdyaView, fetchIdyaPreView, 
					idyaAddLikeView, CreateIdyaView, FetchCategoryListView)

app_name="engineApi"

urlpatterns = [
	url(r'^idya/$',idyaView.as_view() ,name='fetchIdyaList'),
	url(r'^idya/(?P<slug>[\w-]+)/$',fetchIdyaView.as_view() ,name='fetchIdya'),
	url(r'^idya-preview/(?P<id>[\d]+)/$',fetchIdyaPreView.as_view() ,name='fetchIdyaPreview'),
	url(r'^idya/list/personalized/(?P<username>[\w]+)/$',PersonalizedIdyaFeed.as_view() ,name='fetchProfilePersonalizedIdyas'),
	url(r'^idya/list/(?P<username>[\w]+)/$',ProfileIdyas.as_view() ,name='fetchProfileIdyas'),
	url(r'^idya/(?P<id>[\d]+)/likes/$',idyaLikeView.as_view() ,name='idyaLikes'),
	url(r'^idya/(?P<id>[\d]+)/(?P<option>[\w]+)/$',idyaAddLikeView.as_view() ,name='idyaAddLikes'),
	url(r'^idya/(?P<id>[\d]+)/views/$',idyaViewedView.as_view() ,name='idyaViews'),

	# posting idya - iBlog
	url(r'^idya/add/$',CreateIdyaView.as_view() ,name='postIdya'),

	# fetch a list of category options
	url(r'^idya/category/search/(?P<keyword>[\w]+)/$',FetchCategoryListView.as_view() ,name='fetchCategoryList'),

]