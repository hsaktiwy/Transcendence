from .models import FriendRequest

requests = FriendRequest.objects
deletes_count = requests.delete()
print(f"{deletes_count} deleted friend requests !")