# Django Blog API
Blog API built using Django & Django Rest Framework, deployed through Heroku.

### Features
- Custom User
- Auth using JWT
- CRUD blogs


## API Endpoints

To test the following endpoints use **Postman** or **CURL**
<br>Pass form data as key-value pairs in body. Auth credentials to be passed in header as: `Authorization: JWT <access_token>`

- `/api/user/create/`
<br>POST - Creates new user (**email**, **username**, **password** as form data)
- `/api/token/`
<br>POST - Login, returns access and refresh tokens (**email** & **password** form data)
- `/api/token/refresh/`
<br>POST - Get new access token (**refresh token** as form data)
- `/api/user/logout/blacklist/`
<br>POST - Blacklists token (**refresh_token** as form data)
- `/api/blog/`
<br>GET - Retrive all blogs
<br>POST - Create new blog (**title** and **body** as form data)
- `/api/blog/<slug>/`
<br>GET - Retrive specific blog
<br>PUT - Update specific blog (**title** and **body** as form data)
<br>DELETE - Delete specific blog


## Setup

Clone the repo:
```bash
git clone https://github.com/jjnanthakumar/django-react-blog.git
```
Now cd into cloned repo, create a virtualenv and pip install the requirements
```bash
cd server
virtualenv venv
pip3 install -r requirements.txt
source venv/bin/activate
```
Create and apply the migrations

```bash
python3 manage.py makemigrations
python3 manage.py migrate
```

Create a superuser for admin privilages

```bash
python manage.py createsuperuser
```
Now set the variables `DJANGO_SECRET_KEY` and `DEBUG_VALUE` from `core/settings.py` either as environment variables or hard code them into the file itself.
<br>Start the server

```bash
python3 manage.py runserver
```

Head over to [localhost:8000](http://localhost:8000/), or **Postman** to use the application

---
<h3 align="center"><b>Developed with :heart: by Nanthakumar J J</b></h3>
