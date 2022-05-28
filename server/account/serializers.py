from rest_framework import serializers
from .models import Account
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

	@classmethod
	def get_token(cls, user):
		token = super().get_token(user)
		token['username'] = user.username
		return token

class CustomUserSerializer(serializers.ModelSerializer):
	"""
	Currently unused in preference of the below.
	"""
	email = serializers.EmailField(required=True)
	username = serializers.CharField(required=True)
	password = serializers.CharField(min_length=8, write_only=True)

	class Meta:
		model = Account
		fields = ('email', 'username', 'password')
		extra_kwargs = {'password': {'write_only': True}}

	def create(self, validated_data):
		password = validated_data.pop('password', None)
		instance = self.Meta.model(**validated_data)
		if password is not None:
			instance.set_password(password)
		instance.save()
		return instance
