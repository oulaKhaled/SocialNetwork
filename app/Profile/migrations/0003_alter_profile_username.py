# Generated by Django 4.2.4 on 2023-12-10 15:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Profile', '0002_profile_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='username',
            field=models.CharField(default=None, max_length=200),
        ),
    ]
