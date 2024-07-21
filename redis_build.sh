docker build -t my-redis .
docker run -d -p 6379:6379 --name redis-container my-redis