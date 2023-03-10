# Generated by Django 2.2.1 on 2019-05-21 06:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('engine', '0014_auto_20190521_0652'),
    ]

    operations = [
        migrations.AlterField(
            model_name='idya',
            name='category',
            field=models.CharField(choices=[('Health', 'Health'), ('Politics  ', 'Politics  '), ('Nutrition  ', 'Nutrition  '), ('Entrepreneurship  ', 'Entrepreneurship  '), ('Research  ', 'Research  '), ('Books ', 'Books '), ('History ', 'History '), ('Science ', 'Science '), ('Category', 'Category'), ('Others', 'Others'), ('Design ', 'Design '), ('Literature  ', 'Literature  '), ('Recipes  ', 'Recipes  '), ('Fiction  ', 'Fiction  '), ('Friendship  ', 'Friendship  '), ('Technology ', 'Technology '), ('Business ', 'Business '), ('Fashion and Style', 'Fashion and Style'), ('Neuroscience  ', 'Neuroscience  '), ('Dating and Relationships ', 'Dating and Relationships '), ('Astronomy  ', 'Astronomy  '), ('Philosophy  ', 'Philosophy  '), ('Marketing  ', 'Marketing  '), ('Jobs and Careers ', 'Jobs and Careers '), ('Career Advice ', 'Career Advice '), ('Movies ', 'Movies '), ('Blogs  ', 'Blogs  '), ('Cooking ', 'Cooking '), ('Television Series ', 'Television Series '), ('Engineering  ', 'Engineering  '), ('Government  ', 'Government  '), ('Colleges and Universities ', 'Colleges and Universities '), ('Food ', 'Food '), ('Travel ', 'Travel '), ('Web Development ', 'Web Development '), ('Music ', 'Music '), ('Economics  ', 'Economics  '), ('Entertainment  ', 'Entertainment  '), ('Physics  ', 'Physics  '), ('Finance  ', 'Finance  '), ('Journalism  ', 'Journalism  '), ('Startups  ', 'Startups  '), ('Web Design ', 'Web Design '), ('Studying  ', 'Studying  '), ('Innovation  ', 'Innovation  '), ('Psychology ', 'Psychology '), ('Computer Programming ', 'Computer Programming '), ('Learning New Things ', 'Learning New Things '), ('Science of Everyday Life ', 'Science of Everyday Life '), ('Biology  ', 'Biology  ')], default='Category', max_length=50),
        ),
        migrations.AlterField(
            model_name='idya',
            name='channel',
            field=models.OneToOneField(on_delete=None, to='channel.Channel'),
        ),
    ]
