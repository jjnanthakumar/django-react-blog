from django.urls import path
from .views import BlogPostList, BlogPostDetail

app_name = 'blog'

urlpatterns = [
	path('', BlogPostList.as_view(), name='blog-list-create'),
	path('<str:slug>/', BlogPostDetail.as_view(), name='blog-update-delete')
]