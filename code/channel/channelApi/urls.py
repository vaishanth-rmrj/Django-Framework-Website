from django.conf.urls import url

from .views import ( 	
					FetchChannelInfo, FetchSubscribedChannels, ChannelCreateView, 
					FetchChannelIdyas, SearchChannelView
					)

app_name="channelApi"

urlpatterns = [
	url(r'^subscribed-channels/$',FetchSubscribedChannels.as_view() ,name='fetchSubscribedChannels'),
	url(r'^create/$',ChannelCreateView.as_view() ,name='channelCreate'),
	url(r'^fetch-info/(?P<user>[\w]+)/$',FetchChannelInfo.as_view() ,name='fetchChannelInfo'),
	url(r'^fetch-idya/(?P<channelName>[\w ]+)/(?P<filter>[\w]+)/$',FetchChannelIdyas.as_view() ,name='fetchChannelIdyas'),
	url(r'^search-channel/(?P<channelName>[\w ]+)/$',SearchChannelView.as_view() ,name='searchChannel'),

]