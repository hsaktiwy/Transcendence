FROM debian:bullseye

RUN apt-get update
RUN apt-get install -y nginx openssl

COPY ./tools/script.sh .
COPY ./conf/default.conf /etc/nginx/conf.d/default.conf
RUN chmod +x script.sh
CMD ["./script.sh"]
# CMD ["tail","-f","/dev/null"]
