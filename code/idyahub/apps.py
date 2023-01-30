from django.apps import AppConfig


class IdyahubConfig(AppConfig):
    name = 'idyahub'

    def ready(self):
    	import idyahub.signals
