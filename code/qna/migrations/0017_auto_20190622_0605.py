# Generated by Django 2.2.2 on 2019-06-22 06:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('qna', '0016_auto_20190622_0603'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='answer',
            field=models.TextField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='answer',
            name='linked_idya',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='engine.idya'),
        ),
    ]
