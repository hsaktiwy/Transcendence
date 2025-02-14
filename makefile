# Created At: 2020-09-06 11:00:00
CMD = docker-compose

all :
	@echo "Try to run  : make [prod] [dev] [clean] [fclean] [re]"

prod:
	$(CMD) -f docker-compose.prod.yaml up --build
dev:
	$(CMD) -f docker-compose.dev.yaml up --build
clean:
	$(CMD) -f docker-compose.dev.yaml down
	$(CMD) -f docker-compose.prod.yaml down


fclean: clean
	docker system prune -af
	docker volume prune -f

re: fclean all

.PHONY: re fclean all clean
