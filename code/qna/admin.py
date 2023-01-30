from django.contrib import admin

# import from project
from .models import Question, Answer

admin.site.register(Question)
admin.site.register(Answer)
