# Created At: 2020-09-06 11:00:00
CMD = docker-compose

all : run

run:
	$(CMD) up -d --build
clean:
	$(CMD) down
re: fclean all

.PHONY: re fclean all clean