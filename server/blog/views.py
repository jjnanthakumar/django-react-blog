from .models import BlogPost
from .serializers import BlogPostSerializer
from rest_framework import generics
from rest_framework.permissions import SAFE_METHODS, IsAuthenticatedOrReadOnly, BasePermission
from django.http import HttpResponse
from django.shortcuts import redirect

def home(request):
	return HttpResponse('''
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Blog API</title>
	</head>
	<body>
		<div style='text-align: center'>
			<h1>Django Blog API</h1>
			<p><a href='https://github.com/namanshah01/django-blog-api/tree/master#api-endpoints'>Click here</a> to get info about the API endpoints</p>
			<p>Blog API <a href='https://github.com/namanshah01/django-blog-api/'>GitHub Repo</a></p>
			<p>Go to 'Future Diary' <a href='https://react-future-diary-blog.netlify.app/'>React App</a> (built on this API)</p>
			<p>React App <a href='https://github.com/namanshah01/react-blog'>GitHub Repo</a></p>
		</div>
	</body>
	</html>
	''')

def RedirectHome(request):
	return redirect('api/')

class IsAuthorOrReadOnly(BasePermission):
    message = 'Editing posts is restricted to the author only.'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.author == request.user

class BlogPostList(generics.ListCreateAPIView):
	queryset = BlogPost.objects.all().order_by('-date_published')
	permission_classes = (IsAuthenticatedOrReadOnly,)
	serializer_class = BlogPostSerializer
	lookup_field = 'slug'

class BlogPostDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = BlogPost.objects.all()
	permission_classes = (IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly,)
	serializer_class = BlogPostSerializer
	lookup_field = 'slug'
