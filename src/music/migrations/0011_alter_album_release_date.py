# Generated by Django 4.2 on 2023-05-03 08:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0010_playlist_songs'),
    ]

    operations = [
        migrations.AlterField(
            model_name='album',
            name='release_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
