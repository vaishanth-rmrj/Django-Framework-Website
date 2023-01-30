from django.db import models
from django.conf import settings
from django.utils.text import slugify

# imported from project
from idyahub.models import idyahubInfo
from engine.models import idya

class Question(models.Model):
	user		 	= models.ForeignKey(settings.AUTH_USER_MODEL, related_name="questionProfile",on_delete=None)
	hub				= models.ForeignKey(idyahubInfo,on_delete=models.CASCADE,blank=False)
	question 		= models.TextField(max_length=250)
	slug 			= models.SlugField(max_length=250, default="None")
	curiosity 		= models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="curiousProfiles",blank=True)
	curiosity_count = models.PositiveIntegerField(default=0)

	answer 			= models.ManyToManyField('qna.Answer', related_name="answersForQuestioins",blank=True)
	answer_count	= models.PositiveIntegerField(default=0)

	created_at 		= models.DateTimeField(auto_now_add=True)

	def save(self, *args, **kwargs):
		if not self.id:
			# Newly created object, so set slug
			self.slug = slugify(self.question)

		super(Question, self).save(*args, **kwargs)
class Answer(models.Model):
	for_question 	= models.ForeignKey(Question, related_name="answerThisQuestion",on_delete=models.CASCADE)
	user			= models.ForeignKey(settings.AUTH_USER_MODEL, related_name="answeredProfile",on_delete=None)
	
	answer 			= models.TextField(max_length=500, blank=True, null=True)
	linked_idya 	= models.ForeignKey(idya, on_delete=models.CASCADE, blank=True, null=True)

	likes			= models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="answerLikes",blank=True)
	likes_count		= models.PositiveIntegerField(default=0)

	created_at		=models.DateTimeField(auto_now_add=True)