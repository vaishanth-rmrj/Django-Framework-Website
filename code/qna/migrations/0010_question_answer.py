# Generated by Django 2.2.1 on 2019-06-09 05:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('qna', '0009_answer'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='answer',
            field=models.ManyToManyField(blank=True, related_name='answersForQuestioins', to='qna.Answer'),
        ),
    ]
