how to start local server
commands
 >pipenv shell
 >cd src
 >python manage.py runserver

git commit and push  command
 >git add .
 >git commit -m "your message"
 >git push

To change branch
>git checkout "main/pathu"
always commit before switching or checkout.


To open postgres:
open project in terminal by right click[open in terminal]
>cd src
>pipenv shell
>again cd src
>python manage.py dbshell
>set client_encoding to 'utf8';
>select * from music_song;
 
To view the full list in postgres
>\dt
