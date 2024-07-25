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
    [ ] when trying to get the user channel try to identife the last channel a user did sent a message in it bye adding to the channels a property named lastUpdate
 
hints:
    [=] if you need to connect your frontend with the backend, and get the error 401 UnAuthorized or 403 Forbiden,
        cooled be that the server refuse the connection, that because in our back end setting.py there is protect that use to limite the hosts to connect, and trust only (http://localhost:3000, http://127.0.0.1:3000, http://localhost:5173, http://127.0.0.1:5173), you can  you host and pore in this arrays in setting.py and the problem will be fixed:
        CORS_ORIGIN_WHITELIST = (
            "http://localhost:3000",
            "http://localhost:5173",
            "http://127.0.0.1:3000",
            "http://127.0.0.1:5173"
        )

        CORS_ALLOWED_ORIGINS = [
            "http://localhost:3000",
            "http://localhost:5173",
            "http://127.0.0.1:3000",
            "http://127.0.0.1:5173"
        ]

        CSRF_TRUSTED_ORIGINS = ["http://localhost:3000", "http://localhost:5173"]

        plus don't confuse this with the need of the authentication, as this will make you unhable to send request to the backend, cause it will always refuse it no matter what, plus you can notice that from the backend, request debuging (they will be showned after call python manage.py runserver exmple :
            ?> python manage.py runserver
            [18/Jul/2024 10:07:08] "GET /static/rest_framework/js/prettify-min.js HTTP/1.1" 200 13632
            [18/Jul/2024 10:07:08] "GET /static/rest_framework/js/bootstrap.min.js HTTP/1.1" 200 39680
            [18/Jul/2024 10:07:08] "GET /static/rest_framework/js/jquery-3.7.1.min.js HTTP/1.1" 200 87533
            [18/Jul/2024 10:07:08] "GET /static/rest_framework/img/grid.png HTTP/1.1" 304 0
            Not Found: /favicon.ico
            [18/Jul/2024 10:07:08] "GET /favicon.ico HTTP/1.1" 404 3124
        )

        [=] if you found that the backend is screaming 'redis.exceptions.ConnectionError: Error 61 connecting to 127.0.0.1:6379. 61.', this is the result of not founding the redis server working at the port 127.0.0.1:6379 to eneable that go and run the redis_build.sh
        this can require the privelige and the docker existing in the system


guidness : 
    [+] to run the backend properly you need to create a docker container image of redis, run './redis_build.sh build' and she will nuild the image for you (no need to thx me), if you try to restart it (i mean you  if you already have a redis conatiner) run this './redis_build.sh start'