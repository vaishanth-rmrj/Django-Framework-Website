# Generated by Django 2.0.2 on 2018-11-18 02:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('engine', '0002_auto_20181118_0750'),
    ]

    operations = [
        migrations.CreateModel(
            name='idyaViewed',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.AlterField(
            model_name='idya',
            name='category',
            field=models.CharField(choices=[('History ', 'History '), ('Others', 'Others'), ('Food ', 'Food '), ('Marketing  ', 'Marketing  '), ('Recipes  ', 'Recipes  '), ('Fiction  ', 'Fiction  '), ('Computer Programming ', 'Computer Programming '), ('Health', 'Health'), ('Fashion and Style', 'Fashion and Style'), ('Literature  ', 'Literature  '), ('Web Design ', 'Web Design '), ('Astronomy  ', 'Astronomy  '), ('Career Advice ', 'Career Advice '), ('Category', 'Category'), ('Psychology ', 'Psychology '), ('Journalism  ', 'Journalism  '), ('Government  ', 'Government  '), ('Philosophy  ', 'Philosophy  '), ('Television Series ', 'Television Series '), ('Nutrition  ', 'Nutrition  '), ('Technology ', 'Technology '), ('Biology  ', 'Biology  '), ('Neuroscience  ', 'Neuroscience  '), ('Jobs and Careers ', 'Jobs and Careers '), ('Blogs  ', 'Blogs  '), ('Friendship  ', 'Friendship  '), ('Finance  ', 'Finance  '), ('Cooking ', 'Cooking '), ('Economics  ', 'Economics  '), ('Science ', 'Science '), ('Research  ', 'Research  '), ('Engineering  ', 'Engineering  '), ('Dating and Relationships ', 'Dating and Relationships '), ('Learning New Things ', 'Learning New Things '), ('Studying  ', 'Studying  '), ('Politics  ', 'Politics  '), ('Science of Everyday Life ', 'Science of Everyday Life '), ('Travel ', 'Travel '), ('Movies ', 'Movies '), ('Music ', 'Music '), ('Entertainment  ', 'Entertainment  '), ('Entrepreneurship  ', 'Entrepreneurship  '), ('Startups  ', 'Startups  '), ('Web Development ', 'Web Development '), ('Innovation  ', 'Innovation  '), ('Physics  ', 'Physics  '), ('Business ', 'Business '), ('Design ', 'Design '), ('Colleges and Universities ', 'Colleges and Universities '), ('Books ', 'Books ')], default='Category', max_length=50),
        ),
        migrations.AddField(
            model_name='idyaviewed',
            name='for_idya',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.idya'),
        ),
        migrations.AddField(
            model_name='idyaviewed',
            name='viewedProfile',
            field=models.ManyToManyField(blank=True, related_name='idyaViews', to=settings.AUTH_USER_MODEL),
        ),
    ]