# Generated by Django 4.2 on 2023-05-01 17:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0007_remove_album_album_art'),
    ]

    operations = [
        migrations.AddField(
            model_name='album',
            name='album_art',
            field=models.ImageField(default=None, upload_to='album_cover'),
            preserve_default=False,
        ),
    ]
