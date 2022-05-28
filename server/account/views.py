from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomUserSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Account

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class CustomUserCreate(APIView):
	permission_classes = [AllowAny]

	def post(self, request, format='json'):
		serializer = CustomUserSerializer(data=request.data)
		if serializer.is_valid():
			if Account.objects.filter(email=serializer.validated_data['email']).exists():
				return Response({'email': 'Account with same email already exists'}, status=status.HTTP_409_CONFLICT)
			if Account.objects.filter(username=serializer.validated_data['username']).exists():
				return Response({'username': 'Account with same username already exists'}, status=status.HTTP_409_CONFLICT)
			user = serializer.save()
			if user:
				json = serializer.data
				return Response(json, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BlacklistTokenUpdateView(APIView):
	permission_classes = []
	authentication_classes = ()

	def post(self, request):
		try:
			refresh_token = request.data["refresh_token"]
			token = RefreshToken(refresh_token)
			token.blacklist()
			return Response(status=status.HTTP_205_RESET_CONTENT)
		except Exception as e:
			return Response(status=status.HTTP_400_BAD_REQUEST)

class GetUserInfo(APIView):
	permission_classes = [AllowAny]
	
	def get(self, request):
		if str(request.user) == 'AnonymousUser':
			return Response({'username': False}, status=status.HTTP_200_OK)
		else:
			serializer = CustomUserSerializer(request.user)
			return Response(serializer.data)
