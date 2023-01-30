from django.conf.urls import url

from .views import QuestionView, FetchQuestionInfo, FetchAnswersForQuestion

app_name="qnaApi"

urlpatterns = [
	url(r'^ask/question/$',QuestionView.as_view() ,name='askQuestion'),
	url(r'^question-info/(?P<question_slug>[\w-]+)/$',FetchQuestionInfo.as_view() ,name='fetchQuestionInfo'),
	url(r'^question-answer/(?P<question_slug>[\w-]+)/$',FetchAnswersForQuestion.as_view() ,name='fetchAnswer'),

]