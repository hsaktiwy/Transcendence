from rest_framework import generics 
from .models import Friendship
from .serializers import FriendshipSerializer
from users.models import User
# Create your views here.

class send_friend_request(generics.CreateAPIView):
	def post(self, request, *args, **kwargs):
		user = request.user
		friend = User.objects.get(id=request.data['friend_id'])
		friendship = Friendship.objects.create(user=user, friend=friend)
		friendship.save()
		return Response({"message": "Friend request sent successfully"}, status=status.HTTP_201_CREATED)