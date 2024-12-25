while ! ping -c 1 -W 1 postgresql &> /dev/null; do
  echo "Waiting for postgres container..."
  sleep 2
done
python manage.py migrate && python manage.py runserver 0.0.0.0:8000
