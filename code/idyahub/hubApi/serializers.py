from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers

from idyahub.models import idyahubInfo, SharedIdya
from engine.models import idya

class idyahubInfoSerializer(serializers.ModelSerializer):
	class Meta:
		model = idyahubInfo
		fields = '__all__'

class SharedIdyaSerializer(serializers.ModelSerializer):
	shared_by = serializers.StringRelatedField()
	class Meta:
		model = SharedIdya
		fields = (
					'id','shared_by',	
					'idya',
					'created_at','likes_count'
				)
