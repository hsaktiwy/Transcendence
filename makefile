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

clean_docker:
	docker stop $(docker ps -aq) && docker rm $(docker ps -aq)

re: fclean all

.PHONY: re fclean all clean
