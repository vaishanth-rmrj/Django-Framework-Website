from rest_framework import serializers

from qna.models import Question, Answer
from account.models import Profile
from idyahub.models import idyahub

class UsernameField(serializers.StringRelatedField):
	def to_representation(self, obj):
		return obj.username
	def to_internal_value(self, data):
		return Profile.objects.get(username=data[0])

class HubnameField(serializers.StringRelatedField):
	def to_representation(self, obj):
		return obj.hubName
	def to_internal_value(self, data):
		return idyahub.objects.get(title=data[0])

class QuestionDisplaySerializer(serializers.ModelSerializer):
	user = UsernameField()
	hub = HubnameField()
	# curiosity = serializers.StringRelatedField(required=False, many=True)
	class Meta:
		model = Question
		fields = (	
					'user',
					'hub',
					'question',
					'slug',
					'curiosity_count',
					'answer_count',
					'created_at',
		)
		read_only_fields = (
							'answer_count',
							'created_at'
							)

class QuestionCreateSerializer(serializers.ModelSerializer):
	class Meta:
		model = Question
		fields = (	
					'askedBy',
					'fromHub',
					'question',
					'intrestedProfile',
					'answerCount',
					'linkedIdya',
				)
		

class AnswerDisplaySerializer(serializers.ModelSerializer):
	user = UsernameField()
	class Meta:
		model = Answer
		fields = (	
					'user',
					'for_question',
					'answer',
					'linked_idya',
					'likes_count',
					'created_at',
		)
		read_only_fields = (
							'likes_count',
							'created_at'
							)