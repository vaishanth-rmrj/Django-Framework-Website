# Generated by Django 2.0.2 on 2018-11-18 03:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('engine', '0004_auto_20181118_0817'),
    ]

    operations = [
        migrations.RenameField(
            model_name='idya',
            old_name='user',
            new_name='profile',
        ),
        migrations.AlterField(
            model_name='idya',
            name='category',
            field=models.CharField(choices=[('Entertainment  ', 'Entertainment  '), ('Health', 'Health'), ('Music ', 'Music '), ('Business ', 'Business '), ('Books ', 'Books '), ('History ', 'History '), ('Television Series ', 'Television Series '), ('Startups  ', 'Startups  '), ('Technology ', 'Technology '), ('Research  ', 'Research  '), ('Fiction  ', 'Fiction  '), ('Studying  ', 'Studying  '), ('Physics  ', 'Physics  '), ('Dating and Relationships ', 'Dating and Relationships '), ('Movies ', 'Movies '), ('Biology  ', 'Biology  '), ('Neuroscience  ', 'Neuroscience  '), ('Web Development ', 'Web Development '), ('Learning New Things ', 'Learning New Things '), ('Career Advice ', 'Career Advice '), ('Colleges and Universities ', 'Colleges and Universities '), ('Politics  ', 'Politics  '), ('Psychology ', 'Psychology '), ('Government  ', 'Government  '), ('Category', 'Category'), ('Science ', 'Science '), ('Engineering  ', 'Engineering  '), ('Entrepreneurship  ', 'Entrepreneurship  '), ('Finance  ', 'Finance  '), ('Travel ', 'Travel '), ('Cooking ', 'Cooking '), ('Friendship  ', 'Friendship  '), ('Literature  ', 'Literature  '), ('Blogs  ', 'Blogs  '), ('Others', 'Others'), ('Science of Everyday Life ', 'Science of Everyday Life '), ('Economics  ', 'Economics  '), ('Journalism  ', 'Journalism  '), ('Nutrition  ', 'Nutrition  '), ('Computer Programming ', 'Computer Programming '), ('Jobs and Careers ', 'Jobs and Careers '), ('Astronomy  ', 'Astronomy  '), ('Food ', 'Food '), ('Philosophy  ', 'Philosophy  '), ('Recipes  ', 'Recipes  '), ('Web Design ', 'Web Design '), ('Fashion and Style', 'Fashion and Style'), ('Design ', 'Design '), ('Marketing  ', 'Marketing  '), ('Innovation  ', 'Innovation  ')], default='Category', max_length=50),
        ),
    ]
