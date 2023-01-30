# Generated by Django 2.2.2 on 2019-06-22 06:03

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('qna', '0015_auto_20190622_0554'),
    ]

    operations = [
        migrations.RenameField(
            model_name='answer',
            old_name='idya',
            new_name='linked_idya',
        ),
        migrations.AddField(
            model_name='answer',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
