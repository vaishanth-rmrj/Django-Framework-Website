from django.db.models.signals import post_save,pre_save,m2m_changed
from django.dispatch import receiver
from django.utils.text import slugify

from .models import Question, Answer

@receiver(m2m_changed, sender=Question.curiosity.through)
def updateCuriosityCount(sender, **kwargs):
	print("signal to update curiosity_count")
	instance = kwargs['instance']
	if instance.id :		
		instance.curiosity_count = instance.curiosity.all().count()
		instance.save()

@receiver(post_save, sender=Answer)
def updateQuestionModelWithAnswer(sender, **kwargs):
	print("updateQuestionModelWithAnswer")
	instance = kwargs['instance']
	if instance.id :	
		question_info = instance.for_question
		question_info.answer.add(instance)
		question_info.answer_count = question_info.answer_count + 1
		question_info.save()