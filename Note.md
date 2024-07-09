becarefull:
    - keep the secret key used in production secret! (backend/api{or app}/setting.py/SECRET_KEY)
    - There is some comment marked as 'destroyThis' to destroy it before push {Hamza Saktiwy} 

Production levels:
    + added cors to our project mainsetting
        {
            # Added in api/setting.py
            + "corsheaders" -> in the INSTALLED_APPS
            + "corsheaders.middleware.CorsMiddleware" -> in the MIDDLEWARE
            + CORS_ORIGIN_WHITELIST = (
                "http://localhost:3000",
                "http://localhost:8000",
                )
        }
    + added rest_framwork
        {
            # Added in api/setting.py
            + "rest_framework" -> in the  INSTALLED_APPS
            +  REST_FRAMEWORK = {
                "DEFAULT_PERMISSION_CLASSES": [
                    'rest_framework.permissions.AllowAny',
                ],
            }
            CSRF_TRUSTED_ORIGINS = ["http://localhost:3000"] 
        }

Do List:
    [ ] create a way where you can add welcome notification and ProfileStatus at the time where the user is created

