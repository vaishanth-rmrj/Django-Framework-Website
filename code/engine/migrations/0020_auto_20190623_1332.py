# Generated by Django 2.2.2 on 2019-06-23 13:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('engine', '0019_auto_20190623_1331'),
    ]

    operations = [
        migrations.AlterField(
            model_name='idya',
            name='category',
            field=models.CharField(choices=[('Astronomy  ', 'Astronomy  '), ('Psychology ', 'Psychology '), ('Philosophy  ', 'Philosophy  '), ('Music ', 'Music '), ('Health', 'Health'), ('Physics  ', 'Physics  '), ('Nutrition  ', 'Nutrition  '), ('Engineering  ', 'Engineering  '), ('Technology ', 'Technology '), ('Travel ', 'Travel '), ('Television Series ', 'Television Series '), ('Startups  ', 'Startups  '), ('Computer Programming ', 'Computer Programming '), ('Learning New Things ', 'Learning New Things '), ('Career Advice ', 'Career Advice '), ('Science ', 'Science '), ('Biology  ', 'Biology  '), ('Movies ', 'Movies '), ('History ', 'History '), ('Economics  ', 'Economics  '), ('Fiction  ', 'Fiction  '), ('Friendship  ', 'Friendship  '), ('Others', 'Others'), ('Research  ', 'Research  '), ('Web Design ', 'Web Design '), ('Business ', 'Business '), ('Colleges and Universities ', 'Colleges and Universities '), ('Books ', 'Books '), ('Jobs and Careers ', 'Jobs and Careers '), ('Science of Everyday Life ', 'Science of Everyday Life '), ('Web Development ', 'Web Development '), ('Politics  ', 'Politics  '), ('Neuroscience  ', 'Neuroscience  '), ('Dating and Relationships ', 'Dating and Relationships '), ('Food ', 'Food '), ('Entertainment  ', 'Entertainment  '), ('Entrepreneurship  ', 'Entrepreneurship  '), ('Category', 'Category'), ('Fashion and Style', 'Fashion and Style'), ('Government  ', 'Government  '), ('Blogs  ', 'Blogs  '), ('Finance  ', 'Finance  '), ('Journalism  ', 'Journalism  '), ('Marketing  ', 'Marketing  '), ('Recipes  ', 'Recipes  '), ('Innovation  ', 'Innovation  '), ('Literature  ', 'Literature  '), ('Studying  ', 'Studying  '), ('Design ', 'Design '), ('Cooking ', 'Cooking ')], default='Category', max_length=50),
        ),
    ]
