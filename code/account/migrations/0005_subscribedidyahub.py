# Generated by Django 2.0.2 on 2018-11-17 06:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0004_auto_20181117_1134'),
    ]

    operations = [
        migrations.CreateModel(
            name='SubscribedIdyahub',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('for_profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='profile_subscribed_hubs', to=settings.AUTH_USER_MODEL)),
                ('hubs', models.ManyToManyField(blank=True, related_name='subscribedHubs', to=settings.AUTH_USER_MODEL)),
                ('invites', models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
