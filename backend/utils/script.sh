while ! nc -z -v -w 1 postgresql 5432 &> /dev/null; do
  echo "Waiting for postgres container..."
  sleep 2
done
python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000
