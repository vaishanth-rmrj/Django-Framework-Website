
from rest_framework.views import APIView
from rest_framework.response import Response

from django.http import HttpResponse,JsonResponse
from django.shortcuts import get_object_or_404

from idyahub.models import idyahubInfo, idyahub
from account.models import SubscribedIdyahub
from qna.models import Question

from .serializers import idyahubInfoSerializer, SharedIdyaSerializer
from engine.engineApi.serializers import idyaDisplaySerializer
from qna.qnaApi.serializers import QuestionDisplaySerializer

# django rest multiple model framework imports
from .mixins import FlatMultipleModelMixin, ObjectMultipleModelMixin
from rest_framework.generics import GenericAPIView

class fetchHudInfoView(APIView):
	def get(self, request, hubName):
		fetchedHub = idyahubInfo.objects.get(hubName = hubName)
		serialized = idyahubInfoSerializer(fetchedHub)
		return Response(serialized.data, status=200)

class listHubView(APIView):
	def get(self, request):
		try:
			hubList = SubscribedIdyahub.objects.get(for_profile = request.user)
			serialized = idyahubInfoSerializer(hubList.hubs, many=True)
			return Response(serialized.data, status=200)
		except:
			return Response({'error':'No idyahub subscribed'}, status=200)

# class fetchHubContentView(APIView):
# 	def get(self, request, hubName):
# 		hub_info = idyahubInfo.objects.get(hubName=hubName)
# 		hub = idyahub.objects.get(hubInfo=hub_info)
# 		hub_questions = hub.question.all()
# 		hub_shared_idyas = hub.shared_idya.all()
# 		serialized_question = QuestionDisplaySerializer(hub_questions, many=True)
# 		serialized_idya = SharedIdyaSerializer(hub_shared_idyas, many=True)
# 		# print(serialized_question)
# 		# print(serialized_idya)
# 		return Response(serialized_question.data, status=200)

class fetchHubContentView(FlatMultipleModelMixin, GenericAPIView):

	def get(self, request, hubName, filter, *args, **kwargs):
		hub_info = idyahubInfo.objects.get(hubName=hubName)
		hub = idyahub.objects.get(hubInfo=hub_info)
		if filter == 'all':
			
			hub_questions = hub.question.all()
			hub_shared_idyas = hub.shared_idya.all()

			self.sorting_field ="created_at"
			self.querylist = [
				{'queryset': hub.question.all(), 'serializer_class': QuestionDisplaySerializer},
				{'queryset': hub.shared_idya.all(), 'serializer_class': SharedIdyaSerializer},
			]
			return self.list(request, *args, **kwargs)

		if filter == 'question':
			
			hub_questions = hub.question.all()
			serialized = QuestionDisplaySerializer(hub_questions, many=True)			
			return Response(serialized.data, status=200)

		if filter == 'idya':
			
			hub_shared_idyas = hub.shared_idya.all()
			serialized = SharedIdyaSerializer(hub_shared_idyas, many=True)			
			return Response(serialized.data, status=200)

		return Response({'error':'invalid filter type'}, status=404)

	# dont delete
	def get_queryset(self):
		return None

	

	    

    