from rest_framework import serializers


from account.models import Profile, idyaBookmark


class ProfileBasicSerializer(serializers.ModelSerializer):
	username = serializers.StringRelatedField()
	class Meta:
		model = Profile
		fields = [	
					'pk',
					'username',
					'image',
					'bio',					
					'friendCount',
					'score',
					'idyaCount',
		]

class ProfileDetailSerializer(serializers.ModelSerializer):

	class Meta:
		model = Profile
		fields = [	
					'username',
					'first_name',
					'last_name',
					'email',
					'image',
					'gender',
					'bio',
					'age',
					'career',
					'institution',
					'job',
					'company',
					'location',
					'friendCount',
					'score',
					'idyaCount',
		]
class ProfilePicSerializer(serializers.ModelSerializer):
	
	class Meta:
		model = Profile
		fields = ('username','image')

class ProfileSetupSerializer(serializers.ModelSerializer):

	class Meta:
		model = Profile
		fields = [	
					'image',
					'bio',					
					'gender',					
					'age',
					'career',
					'institution',
					'job',
					'company',
					'location',
		]

class BookmarkSerializer(serializers.ModelSerializer):

	class Meta:
		model = idyaBookmark
		fields = [
					'for_profile','bookmarked_idyas'
					]