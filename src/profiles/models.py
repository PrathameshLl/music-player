from django.db import models
from django.contrib.auth.models import User

# Create your models here


def crop_image(image):
    width, height = image.size
    if width == height:
        return image
    offset  = int(abs(height-width)/2)
    if width>height:
        image = image.crop([offset,0,width-offset,height])
    else:
        image = image.crop([0,offset,width,height-offset])
    return image 


class Profile(models.Model):
    profile_picture = models.ImageField(default="defaults/profile/profile_pic.jpg") 
    user = models.OneToOneField(User,on_delete=models.CASCADE)


    def crop_image(image):
        width, height = image.size
        if width == height:
            return image
        offset  = int(abs(height-width)/2)
        if width>height:
            image = image.crop([offset,0,width-offset,height])
        else:
            image = image.crop([0,offset,width,height-offset])
        return image 