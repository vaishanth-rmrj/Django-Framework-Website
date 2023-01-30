from django.apps import AppConfig


class OptimizerConfig(AppConfig):
    name = 'optimizer'
    def ready(self):
    	import optimizer.optimizeImg