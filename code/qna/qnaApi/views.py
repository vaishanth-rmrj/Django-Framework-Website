from rest_framework.views import APIView
from rest_framework.response import Response

from django.http import HttpResponse,JsonResponse
from django.shortcuts import get_object_or_404

from .serializers import ( QuestionDisplaySerializer, QuestionCreateSerializer,
							AnswerDisplaySerializer	)
from qna.models import Question, Answer

class QuestionView(APIView):
	def get(self, request):
		ques = Question.objects.all()
		serialized = QuestionDisplaySerializer(ques, many=True)
		return Response(serialized.data, status=200)

	def post(self, request):
		data = request.data
		serialized = QuestionCreateSerializer(data=data)
		if serialized.is_valid():
			serialized.save()
			return Response(serialized.data, status=201)
		return Response(serialized.errors, status=501)

class FetchQuestionInfo(APIView):
	def get(self, request, question_slug):
		try:
			question_info = Question.objects.get(slug=question_slug)
			serialized = QuestionDisplaySerializer(question_info)
			return Response(serialized.data, status=200)
		except:
			return Response({'error':'No question found !!'}, status=404)

class FetchAnswersForQuestion(APIView):
	def get(self, request, question_slug):
		try:
			question_info = Question.objects.get(slug=question_slug)
			answer_query = Answer.objects.filter(for_question=question_info)
			serialized = AnswerDisplaySerializer(answer_query, many=True)
			return Response(serialized.data, status=200)
		except:
			return Response({'status':'No Answer found !!'}, status=404)