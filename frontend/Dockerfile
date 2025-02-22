FROM node:22

# install nginx packages
RUN apt-get update
RUN apt-get install -y nginx openssl

WORKDIR /app

COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build
# nginx setup
COPY ./nginx/conf/default.conf /etc/nginx/conf.d/default.conf
RUN chmod +x script.sh

CMD ["/bin/sh", "-c", "./script.sh"]