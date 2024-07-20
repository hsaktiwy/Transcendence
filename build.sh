docker build -t my-redis .
docker run -d -p 6379:6379 --name redis-container my-redis
python3 -m venv .venv
source .venv/bin/activate
pip install -r ./backend/requirements.txt
cd frontend/ && npm install
cd ..
python ./backend/manage.py migrate