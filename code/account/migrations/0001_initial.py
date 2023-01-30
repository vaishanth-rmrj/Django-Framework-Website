# Generated by Django 2.0.2 on 2018-11-17 04:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('username', models.CharField(max_length=40, unique=True)),
                ('first_name', models.CharField(max_length=40)),
                ('last_name', models.CharField(max_length=40)),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=False)),
                ('image', models.ImageField(blank=True, upload_to='profilePic')),
                ('bio', models.TextField(blank=True, max_length=150, null=True)),
                ('dob', models.DateField(blank=True, null=True)),
                ('age', models.PositiveIntegerField(default=0)),
                ('gender', models.CharField(choices=[('Male', 'Male'), ('Female', 'Female'), ('Others', 'Others')], default='Male', max_length=6)),
                ('career', models.CharField(blank=True, choices=[('Studying', 'Studying'), ('Working', 'Working'), ('Business', 'Business'), ('Entrepreneur', 'Entrepreneur')], default='none', max_length=15, null=True)),
                ('institution', models.CharField(blank=True, default='none', max_length=100, null=True)),
                ('job', models.CharField(blank=True, default='none', max_length=100, null=True)),
                ('company', models.CharField(blank=True, default='none', max_length=100, null=True)),
                ('location', models.CharField(blank=True, default='none', max_length=100, null=True)),
                ('friendCount', models.PositiveIntegerField(default=0)),
                ('score', models.IntegerField(default=0)),
                ('idyaCount', models.PositiveIntegerField(default=0)),
                ('last_login', models.DateTimeField(auto_now=True)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
