# mkdir postgres_volume
# chmod +x postgres_volume
# docker compose up --build
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc"  -delete