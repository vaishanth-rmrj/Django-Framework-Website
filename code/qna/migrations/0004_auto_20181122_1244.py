# Generated by Django 2.0.2 on 2018-11-22 07:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('qna', '0003_question'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='askedBy',
        ),
        migrations.RemoveField(
            model_name='question',
            name='fromHub',
        ),
        migrations.RemoveField(
            model_name='question',
            name='intrestedProfile',
        ),
        migrations.DeleteModel(
            name='Question',
        ),
    ]
