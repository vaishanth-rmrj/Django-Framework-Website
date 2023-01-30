from rest_framework import serializers

from engine.models import idya, idyaLike, idyaViewed, Category

class idyaDisplaySerializer(serializers.ModelSerializer):

	channel = serializers.StringRelatedField()
	class Meta:
		model = idya
		fields = (
					'id','channel',	
					'title','slug','idyatype','category',
					'created_at','updated_at',
					'post','image','videoUrl',
					'likeCount','dislikeCount', 'views'
				)
		read_only_fields = (
							'created_at',
							'updated_at',
							'likeCount',
							'dislikeCount', 
							'views'
							)

class idyaPreviewSerializer(serializers.ModelSerializer):

	channel = serializers.StringRelatedField()
	class Meta:
		model = idya
		fields = (
					'id','channel',	
					'title','slug','idyatype',
					'created_at',
					'post','image','videoUrl', 'views'
				)
		

class idyaSerializer(serializers.ModelSerializer):

	class Meta:
		model = idya
		fields = (
					'id',
					'title','idyatype','category',
					'created_at','updated_at',
					'post','image','videoUrl',
					'likeCount','dislikeCount', 'views'
				)
		read_only_fields = (
							'created_at',
							'updated_at',
							'likeCount',
							'dislikeCount', 
							'views'
							)

class idyaCreateSerializer(serializers.ModelSerializer):

	class Meta:
		model = idya
		fields = (
					'title','idyatype','category',
					'created_at','updated_at',
					'post','image','videoUrl',
				)

class idyaLikeSerializer(serializers.ModelSerializer):
	likedProfile = serializers.StringRelatedField(many=True)
	dislikedProfile = serializers.StringRelatedField(many=True)
	
	class Meta:
		model = idyaLike
		fields = (
					'for_idya',	
					'likedProfile',
					'dislikedProfile',
				)

class idyaViewedSerializer(serializers.ModelSerializer):
	class Meta:
		model = idyaViewed
		fields = [
					'for_idya',	
					'viewedProfile',
				]

class CategoryListSerializer(serializers.ModelSerializer):
	class Meta:
		model = Category
		fields = [
					'category',	
				]