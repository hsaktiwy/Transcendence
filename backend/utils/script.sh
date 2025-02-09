find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc"  -delete
while ! nc -z -v -w 1 postgresql 5432 &> /dev/null; do
  echo "Waiting for postgres container..."
  sleep 2
done
# python manage.py makemigrations && python manage.py migrate && daphne -b 0.0.0.0 -p 8000 api.asgi:application
