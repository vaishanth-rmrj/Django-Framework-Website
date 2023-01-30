from rest_framework import serializers

from channel.models import Channel

class channelDisplaySerializer(serializers.ModelSerializer):

	user = serializers.StringRelatedField()
	class Meta:
		model = Channel
		fields = (
					'id','user','name','description','picture','subscribers_count','created_at', 'active',
				)
		read_only_fields = (
							'subscribers_count',
							'created_at',
							'active',
							)

class channelSearchSerializer(serializers.ModelSerializer):	
	class Meta:
		model = Channel
		fields = (
					'id','name','subscribers_count','idyasCount'
				)

class channelCreateSerializer(serializers.ModelSerializer):
	class Meta:
		model = Channel
		fields = (
					'user','name','description',
				)