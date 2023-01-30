from django.conf.urls import url

from .views import ( 
						ProfileView, SearchForProfileView, ProfileSetupView, FetchAuthenticatedProfile, 
						FriendRequestView, FriendRequestProcessView, BookmarksFetchView,
						BookmarkAddView, FetchProfilePictureView, ProfileFriendListView,
						ProfileFriendSearch , CheckFollowingStatus
					)

app_name="accountApi"

urlpatterns = [
	url(r'^profile/active/$', FetchAuthenticatedProfile.as_view(), name='authenticatedProfile'),
	url(r'^profile/(?P<option>[\w]+)/(?P<username>[\w]+)$', ProfileView.as_view(), name='fetchProfile'),
	url(r'^profile/search-profile/(?P<profileName>[\w]+)/$', SearchForProfileView.as_view(), name='searchForProfile'),
	url(r'^profile/setup/$', ProfileSetupView.as_view(), name='setupProfile'),
	url(r'^profile/request/$', FriendRequestView.as_view(), name='friendRequest'),
	url(r'^profile/request/(?P<option>[\w]+)/(?P<id>[\d]+)/$', FriendRequestProcessView.as_view(), name='processRequest'),
	url(r'^profile/bookmarked-idyas/$', BookmarksFetchView.as_view(), name='idyaBookmarkFetch'),
	url(r'^profile/bookmark-idya/(?P<idyaSlug>[\w-]+)/$', BookmarkAddView.as_view(), name='idyaBookmarkAdd'),
	url(r'^profile/fetch-profile-pic/(?P<username>[\w]+)$', FetchProfilePictureView.as_view(), name='fetchProfilePic'),
	url(r'^profile/friend-list/(?P<username>[\w]+)$', ProfileFriendListView.as_view(), name='fetchFriendList'),
	url(r'^profile/search-friend/(?P<profileName>[\w]+)/(?P<friendName>[\w]+)$', ProfileFriendSearch.as_view(), name='searchProfileFriend'),
	url(r'^profile/check-friend-status/(?P<profileName>[\w]+)/$', CheckFollowingStatus.as_view(), name='checkFriendStatus'),
]