
from rest_framework.views import APIView
from rest_framework.response import Response

from django.http import HttpResponse,JsonResponse
from django.shortcuts import get_object_or_404

from channel.models import Channel, SubscribedChannel
from account.models import Profile

from .serializers import channelDisplaySerializer, channelCreateSerializer,channelSearchSerializer
from engine.engineApi.serializers import idyaDisplaySerializer

class FetchSubscribedChannels(APIView):
	def get(self, request):
		try:
			subscribedChannelList = SubscribedChannel.objects.get(for_profile=request.user)
			if subscribedChannelList.channels :
				serialized = channelDisplaySerializer(subscribedChannelList.channels, many=True)
				return Response(serialized.data, status=200)
			return Response({'status':'No channel subscribed'})
		except:
			return Response({'status':'No channel subscribed'})


"""
api for creating a new channel
"""
class ChannelCreateView(APIView):

	def post(self, request):
		print(request.data)
		serialized = channelCreateSerializer(data=request.data)
		if serialized.is_valid():
			serialized.save()
			return Response(serialized.data, status=201)
		return Response(serialized.errors)


class FetchChannelInfo(APIView):

	def get(self, request, user):
		userData 	= Profile.objects.get(username=user)
		try:
			ChannelData = Channel.objects.get(user=userData)
		except:
			return JsonResponse({'error':'Channel not yet created'})
		serialized = channelDisplaySerializer(ChannelData)
		return Response(serialized.data, status=200)

class FetchChannelIdyas(APIView):
	"""
		view to fetch channel idyas
		parameters:
			channelName
			filter
	"""
	def get(self, request, channelName, filter):
		print(channelName + filter)
		channelData = Channel.objects.get(name=channelName)		
		if filter == "all":
			channelIdyas = channelData.idyas
		elif filter == "blog":
			channelIdyas = channelData.idyas.filter(idyatype = "iLog")
		elif filter == "image":
			channelIdyas = channelData.idyas.filter(idyatype = "iMage")
		elif filter == "video":
			channelIdyas = channelData.idyas.filter(idyatype = "iVdeo")
		else:
			channelIdyas = channelData.idyas

		serialized = idyaDisplaySerializer(channelIdyas, many=True)
		return Response(serialized.data, status=200)

class SearchChannelView(APIView):
	"""
		search for channel
		parameters:
			channelName
	"""
	def get(self, request, channelName):
		print(channelName)
		channelData = Channel.objects.filter(name__icontains=channelName)		
		serialized = channelSearchSerializer(channelData, many=True)
		return Response(serialized.data, status=200)