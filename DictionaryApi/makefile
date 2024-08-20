.PHONY: build infra-local cleanup clean-images

build:
	@echo "Construindo a imagem do Docker..."
	docker build -t dictionaryapi .

infra-local:
	@echo "Infraestrutura local configurada e imagem Docker criada."
	@docker-compose up -d

cleanup:
	docker-compose down

clean-images:
	docker rmi dictionaryapi
