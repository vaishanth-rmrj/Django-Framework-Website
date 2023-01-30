
from rest_framework.views import APIView
from rest_framework.response import Response

from django.http import HttpResponse,JsonResponse
from django.shortcuts import get_object_or_404

from account.models import Profile
from engine.models import idya, idyaLike, idyaViewed, Category

from .serializers import ( 	idyaSerializer, idyaDisplaySerializer, idyaLikeSerializer, idyaPreviewSerializer,
							idyaViewedSerializer, idyaCreateSerializer, CategoryListSerializer)

class idyaView(APIView):
	def get(self, request):
		fetchedIdyas = idya.objects.all()
		serialized = idyaDisplaySerializer(fetchedIdyas, many=True)
		return Response(serialized.data, status=200)
	def post(self, request):
		data = request.data
		serialized = idyaSerializer(data=data)
		if serialized.is_valid():
			serialized.save()
			return Response(serialized.data, status=201)
		return Response(serialized.errors)

class fetchIdyaView(APIView):
	def get(self, request, slug):
		fetchedIdya = idya.objects.get(slug=slug)
		serialized = idyaDisplaySerializer(fetchedIdya)
		return Response(serialized.data, status=200)

	def post(self, request, id):
		data = request.data
		updateIdya = idya.objects.get(id=id)
		serialized = idyaSerializer(updateIdya, data=data,partial=True)
		if serialized.is_valid():
			serialized.save()
			return Response(serialized.data, status=201)
		return Response(serialized.errors)

class fetchIdyaPreView(APIView):
	def get(self, request, id):
		fetchedIdya = idya.objects.get(id=id)
		serialized = idyaPreviewSerializer(fetchedIdya)
		return Response(serialized.data, status=200)

class PersonalizedIdyaFeed(APIView):
	def get(self, request, username):
		fetchedProfile = Profile.objects.get(username=username)
		fetchedIdyas = idya.objects.all()
		serialized = idyaDisplaySerializer(fetchedIdyas, many=True)
		return Response(serialized.data, status=200)

class ProfileIdyas(APIView):
	def get(self, request, username):
		fetchedProfile = Profile.objects.get(username=username)
		fetchedIdyas = idya.objects.all().filter(profile=fetchedProfile)
		serialized = idyaDisplaySerializer(fetchedIdyas, many=True)
		return Response(serialized.data, status=200)

class idyaLikeView(APIView):
	def get(self, request, id):
		fetchedIdya = idya.objects.get(id=id)
		like = idyaLike.objects.get(for_idya=fetchedIdya)
		serialized = idyaLikeSerializer(like)
		return Response(serialized.data, status=200)

class idyaAddLikeView(APIView):
	def get(self, request, id, option):
		fetchedIdya = idya.objects.get(id=id)
		like = idyaLike.objects.get(for_idya=fetchedIdya)
		if option == "like":
			like.likedProfile.add(request.user)
			like.dislikedProfile.remove(request.user)
			return Response({'success':'idya has been liked'}, status=200)
		if option == "dislike":
			like.dislikedProfile.add(request.user)
			like.likedProfile.remove(request.user)
			return Response({'success':'idya has been disliked'}, status=200)
		return Response({'error':'invalid request'}, status=404)
class idyaViewedView(APIView):
	def get(self, request, id):
		fetchedIdya = idya.objects.get(id=id)
		views = idyaViewed.objects.get(for_idya=fetchedIdya)
		serialized = idyaViewedSerializer(views)
		return Response(serialized.data, status=200)

class CreateIdyaView(APIView):
	def post(self,request):
		serialized = idyaCreateSerializer(data=request.data)
		if serialized.is_valid():
			serialized.save()
			return Response(serialized.data, status=200)
		return Response(serialized.errors)


# to fetch category list
class FetchCategoryListView(APIView):
	def get(self, request, keyword):
		try:
			category_list = Category.objects.filter(category__icontains=keyword)
			serialized = CategoryListSerializer(category_list, many=True)			
			return Response(serialized.data, status=200)
		except:
			return Response({'status':'category not found'}, status=200)