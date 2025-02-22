# Created At: 2020-09-06 11:00:00
CMD = docker-compose

all : run

run:
	$(CMD) -f docker-compose.yaml up --build

clean:
	$(CMD) -f docker-compose.yaml down

restart:
	docker restart daphne_django gunicorn_django frontend

fclean: clean
	docker system prune -af
	docker volume prune -f

re: fclean all

rm_i:
	@docker rmi -f ${shell docker image ls -aq} || echo "Nothing_to_delete"

rm_c:
	@docker rm -f ${shell docker container ls -aq} || echo "Nothing_to_delete"

rm_v:
	@docker volume rm -f ${shell docker volume ls -q} || echo "Nothing_to_delete"

reboot: rm_c rm_i rm_v
	docker system prune -af
	docker volume prune -f
	@clear && echo "====Clean===="

.PHONY: re fclean all clean_dev clean_prod restart rm_i rm_c rm_v reboot
