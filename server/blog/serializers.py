from rest_framework import serializers
from .models import BlogPost

class BlogPostSerializer(serializers.ModelSerializer):
	username	= serializers.SerializerMethodField('get_username')
	slug		= serializers.SerializerMethodField('get_slug')
	author		= serializers.HiddenField(default=serializers.CurrentUserDefault())

	class Meta:
		model	= BlogPost
		fields	= ['title', 'body', 'date_updated', 'author', 'slug', 'username']
		read_only_fields = ['author']

	def get_username(self, blog_post):
		return blog_post.author.username

	def get_slug(self, blog_post):
		return blog_post.slug
