from django.urls import path
from .views import GetUserInfo, CustomUserCreate, BlacklistTokenUpdateView

app_name = 'users'

urlpatterns = [
	path('create/', CustomUserCreate.as_view(), name="create_user"),
	path('getinfo/', GetUserInfo.as_view(), name="user_info"),
	path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist')
]
