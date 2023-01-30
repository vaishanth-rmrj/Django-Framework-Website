from django.conf.urls import url

from .views import fetchHudInfoView, listHubView, fetchHubContentView
app_name="hubApi"

urlpatterns = [
	url(r'^info/(?P<hubName>[\w]+)$',fetchHudInfoView.as_view() ,name='fetchHudInfo'),
	url(r'^list/$',listHubView.as_view() ,name='fetchHubList'),
	url(r'^fetch-content/(?P<hubName>[\w]+)/(?P<filter>[\w]+)/$',fetchHubContentView.as_view() ,name='fetchHubIdyas'),

]