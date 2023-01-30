from django.apps import AppConfig


class QnaConfig(AppConfig):
	name = 'qna'

	def ready(self):
		import qna.signals