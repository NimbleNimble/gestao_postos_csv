# Gestão de postos
Importação, normalização e exportação de CSV

## Containers Docker

### Ambientes
De acordo com o arquivo docker-compose.yml os ambientes devem rodar nos seguintes endereços:

#### Frontend (Vue 3 + Vuetify)
- http://localhost:5173

#### Backend (Node + Express)
- http://localhost:3000

#### Database (Postgre)
- http://localhost:5432

### Gerenciamento de containers

Cria os containers e os mantém ativo em segundo plano
```bash
docker compose up -d --build
```

Inativa os containers e mantém seus volumes
```bash
docker compose down
```

Inativa os containers e remove os volumes/Limpa o banco de dados
```bash
docker compose down -v
```

Listar os containers, ativos e inativos:
```bash
docker ps -a
```

### Migrations

Criar uma nova migration:
```bash
docker compose exec backend npx node-pg-migrate create nome-da-migration
```

Aplicar as migrations pendentes:
```bash
docker compose exec backend npm run migrate up
```

Desfazer a última migration aplicada:
```bash
docker compose exec backend npm run migrate down
```