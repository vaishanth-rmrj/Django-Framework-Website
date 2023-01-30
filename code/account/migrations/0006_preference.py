# Generated by Django 2.0.2 on 2018-11-17 13:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import jsonfield.fields


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0005_subscribedidyahub'),
    ]

    operations = [
        migrations.CreateModel(
            name='Preference',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('favCategory', jsonfield.fields.JSONField(blank=True, null=True)),
                ('for_profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='profile_preference', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]