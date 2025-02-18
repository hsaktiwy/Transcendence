FROM python:3.12-slim-bookworm
RUN apt-get update \
    && apt-get install -y \
       libpq-dev \
       gcc \
       netcat-openbsd \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
ENV DJANGO_LOG_LEVEL=INFO
COPY requirements.txt .
COPY ./utils/script.sh .
RUN chmod +x script.sh
RUN pip install --no-cache-dir -r requirements.txt
WORKDIR /app