# Created At: 2020-09-06 11:00:00
CMD = docker-compose

all : run

run:
	$(CMD) up --build
clean:
	$(CMD) down

fclean: clean
	docker system prune -af
	docker volume prune -f

re: fclean all

.PHONY: re fclean all clean
