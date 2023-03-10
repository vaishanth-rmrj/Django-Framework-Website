# Generated by Django 2.0.5 on 2019-03-05 15:23

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Channel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25)),
                ('subscribers_count', models.PositiveIntegerField(default=0)),
                ('active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('subscribers', models.ManyToManyField(blank=True, related_name='channel_subscribers', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(on_delete=None, related_name='channel_user', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'idya',
                'ordering': ['-subscribers_count'],
            },
        ),
    ]
