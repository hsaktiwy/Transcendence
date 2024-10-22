import requests
from io import BytesIO
responseImage = requests.get('https://cdn.intra.42.fr/users/5916df7e3dde8c3e2e997ef632485035/medium_aalami.jpg')
if responseImage.status_code == 200:
    profile_pic = BytesIO(responseImage.content)
    with open('local_image.jpg', 'wb') as f:
        f.write(profile_pic.getbuffer()) 