# Generated by Django 2.0.2 on 2018-11-18 14:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('engine', '0005_auto_20181118_0834'),
    ]

    operations = [
        migrations.AlterField(
            model_name='idya',
            name='category',
            field=models.CharField(choices=[('Finance  ', 'Finance  '), ('Books ', 'Books '), ('Food ', 'Food '), ('Psychology ', 'Psychology '), ('Marketing  ', 'Marketing  '), ('Nutrition  ', 'Nutrition  '), ('Research  ', 'Research  '), ('Computer Programming ', 'Computer Programming '), ('Innovation  ', 'Innovation  '), ('Web Development ', 'Web Development '), ('Career Advice ', 'Career Advice '), ('Entrepreneurship  ', 'Entrepreneurship  '), ('Colleges and Universities ', 'Colleges and Universities '), ('Web Design ', 'Web Design '), ('Others', 'Others'), ('Entertainment  ', 'Entertainment  '), ('Neuroscience  ', 'Neuroscience  '), ('Engineering  ', 'Engineering  '), ('Astronomy  ', 'Astronomy  '), ('Science ', 'Science '), ('Television Series ', 'Television Series '), ('Learning New Things ', 'Learning New Things '), ('Technology ', 'Technology '), ('Cooking ', 'Cooking '), ('Philosophy  ', 'Philosophy  '), ('Fashion and Style', 'Fashion and Style'), ('Music ', 'Music '), ('Category', 'Category'), ('Startups  ', 'Startups  '), ('Studying  ', 'Studying  '), ('Blogs  ', 'Blogs  '), ('Health', 'Health'), ('Travel ', 'Travel '), ('Movies ', 'Movies '), ('Economics  ', 'Economics  '), ('Literature  ', 'Literature  '), ('Recipes  ', 'Recipes  '), ('Politics  ', 'Politics  '), ('Design ', 'Design '), ('Physics  ', 'Physics  '), ('Science of Everyday Life ', 'Science of Everyday Life '), ('Fiction  ', 'Fiction  '), ('Jobs and Careers ', 'Jobs and Careers '), ('Dating and Relationships ', 'Dating and Relationships '), ('Friendship  ', 'Friendship  '), ('Government  ', 'Government  '), ('History ', 'History '), ('Biology  ', 'Biology  '), ('Journalism  ', 'Journalism  '), ('Business ', 'Business ')], default='Category', max_length=50),
        ),
    ]
