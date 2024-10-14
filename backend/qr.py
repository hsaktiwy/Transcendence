import pyotp
import qrcode
test = pyotp.random_base32()
totp = pyotp.TOTP(test)
otp_uri = totp.provisioning_uri('amine331@gmail.com', issuer_name="YourAppName")
qr_img = qrcode.make(otp_uri)
qr_img.save('qr.png')