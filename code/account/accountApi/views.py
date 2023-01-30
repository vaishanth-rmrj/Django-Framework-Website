from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from engine.models import idya
from account.models import Profile, Friend, idyaBookmark
from .serializers import (	ProfileDetailSerializer, ProfileBasicSerializer, ProfilePicSerializer, 
							ProfileSetupSerializer, BookmarkSerializer	)

from engine.engineApi.serializers import idyaDisplaySerializer


class FetchAuthenticatedProfile(APIView):

	def get(self, request):
		if request.user.is_authenticated:
			serialized = ProfileBasicSerializer(request.user)
			return Response(serialized.data)
		return Response({'username':'Anonymous'})

class ProfileView(APIView):

	def get(self,request,option,username):
		if option == 'basic':
			fetchedProfile = Profile.objects.get(username=username)
			serialized = ProfileBasicSerializer(fetchedProfile)
			return Response(serialized.data)
		if option == 'detail':
			fetchedProfile = Profile.objects.get(username=username)
			serialized = ProfileDetailSerializer(fetchedProfile)
			return Response(serialized.data)

	def post(self,request):
		data = request.data
		serialized = ProfileSerializer(data=data)
		if serialized.is_valid():
			serialized.save()
			return Response(serialized.data, status=201)
		return Response(serialized.errors, status=404)

class SearchForProfileView(APIView):
	def get(self, request, profileName):			
		fetchedProfiles = Profile.objects.filter(username__istartswith=profileName)
		if fetchedProfiles:
			serialized = ProfileBasicSerializer(fetchedProfiles, many=True)
			return Response(serialized.data, status=201)		
		return Response({'status':'no results were found'})

class ProfileSetupView(APIView):

	def post(self,request):
		data = request.data
		serialized = ProfileSetupSerializer(request.user, data=data, partial=True)
		if serialized.is_valid():
			serialized.save()
			return Response(serialized.data, status=201)
		return Response(serialized.errors, status=404)

class FriendRequestView(APIView):

	def post(self,request):
		data = request.data
		requested = Profile.objects.get(id=data['requested'])
		instance = Friend.objects.get(for_profile=requested)
		instance.request.add(request.user)
		instance.save()

		return Response({'success': 'friend request sent' }, status=200)
		
class FriendRequestProcessView(APIView):

	def get(self,request,option,id):
		if option == 'accept':
			requested = Profile.objects.get(id=id)
			Friend.objects.accept_request(request.user, requested)		
			return Response({'success': 'friend request accepted' })
		if option == 'reject':
			requested = Profile.objects.get(id=id)
			Friend.objects.reject_request(request.user, requested)		
			return Response({'success': 'friend request rejected' })

class BookmarkAddView(APIView):

	def get(self, request, idyaSlug):
		fetchIdya = idya.objects.get(slug=idyaSlug)
		try:
			bookmark = idyaBookmark.objects.get(for_profile=request.user)
		except:
			bookmark = idyaBookmark.objects.create(for_profile=request.user)

		if bookmark.bookmarked_idyas.all().filter(slug=idyaSlug):
			bookmark.bookmarked_idyas.remove(fetchIdya)
			bookmark.save()
			return Response({'status': 'added','msg':'Bookmark added' }, status=200)
		else:
			bookmark.bookmarked_idyas.add(fetchIdya)
			bookmark.save()
			return Response({'status': 'removed','msg':'Bookmark removed' }, status=200)

		


class BookmarksFetchView(APIView):
	def get(self, request):
		try:		
			bookmarks = idyaBookmark.objects.get(for_profile=request.user)
			serialized = idyaDisplaySerializer(bookmarks.bookmarked_idyas, many=True)
			return Response(serialized.data, status=200)
		except:	
			return Response({"error":"no bookmark found"})

class FetchProfilePictureView(APIView):
	def get(self, request, username):
		profile = Profile.objects.get(username = username)
		serialized = ProfilePicSerializer(profile)
		return Response(serialized.data, status=200)

class ProfileFriendListView(APIView):
	def get(self, request, username):
		profile = Profile.objects.get(username = username)
		frndQs = Friend.objects.get(for_profile=profile)
		frndList = frndQs.friends.all()
		serialized = ProfileBasicSerializer(frndList , many=True)
		return Response(serialized.data, status=200)

class ProfileFriendSearch(APIView):
	def get(self, request, profileName, friendName):
		profile = Profile.objects.get(username = profileName)
		frndQs = Friend.objects.get(for_profile=profile)
		frndList = frndQs.friends.filter(username__icontains = friendName)
		if frndList.exists():
			serialized = ProfileBasicSerializer(frndList , many=True)		
			return Response(serialized.data, status=200)
		return Response({'error':'friend does not exist'})
	

class CheckFollowingStatus(APIView):
	def get(self, request, profileName):
		profile = Friend.objects.get(for_profile = request.user)
		print(profile)
		friendStatus = profile.friends.filter(username = profileName)
		if friendStatus.exists():	
			return Response({'status':'friend'})
		return Response({'status':'not-friend'})