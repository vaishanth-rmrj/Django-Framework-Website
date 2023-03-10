# Generated by Django 2.2.1 on 2019-06-01 05:53

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('channel', '0004_channel_description'),
    ]

    operations = [
        migrations.CreateModel(
            name='SubscribedChannel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('channels', models.ManyToManyField(blank=True, related_name='subscribedChannels', to='channel.Channel')),
                ('for_profile', models.ForeignKey(on_delete=None, related_name='profile_Subscribing', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
