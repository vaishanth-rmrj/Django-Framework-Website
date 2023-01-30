from django.apps import AppConfig


class EngineConfig(AppConfig):
    name = 'engine'

    def ready(self):
    	import engine.signals
