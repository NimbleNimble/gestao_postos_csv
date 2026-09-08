# Gestão de postos

## Resumo

Este sistema tem como objetivo gerenciar a base de dados de postos de combustíveis.
Ele é composto por 3 containers: frontend, backend e banco de dados.

Por meio do frontend, o usuário pode enviar arquivos CSV, visualizar os dados já salvos e baixar um novo arquivo CSV compatível com o original.

Todo o processamento de dados, incluindo importação, exportação, formatação e persistência, é realizado pelo backend, o que facilita a manutenção, segue boas práticas e melhora a performance geral do sistema.

## Arquitetura de banco

Cada linha do CSV a ser importado contém informações de duas entidades principais. Para cada uma delas, criamos as tabelas: **postos** e **responsaveis**.

A fim de evitar duplicidade e redundância de dados, criamos também tabelas do tipo 1:n.
Dados como **bandeiras**, **combustiveis** e **status** poderiam ser, cada um, colunas do tipo ENUM na tabela de postos. No entanto, isso limitaria a inserção de novos combustíveis, bandeiras e status.

O mesmo ocorre com a tabela de **municipios**, com a diferença de que o banco permite cidades com o mesmo nome desde que pertençam a UFs diferentes.

Por fim, temos a tabela **postos_combustiveis**, com a finalidade de relacionar as tabelas "postos" e "combustiveis" em uma relação n:n.

A arquitetura do banco está descrita em: `DATABASE.md`

## Instalação passo a passo

Baixe o arquivo:

```bash
git clone https://github.com/NimbleNimble/gestao_postos_csv
```

Construa e rode os containers em segundo plano

```bash
docker compose up -d --build
```

Rode a migrations para criar as tabelas no banco de dados

```bash
docker compose exec backend npm run migrate up
```

### Pronto!

Acesse e utilize o sistema: http://localhost:5173

<hr>

## Comandos úteis e informações adicionais

### Ambientes

De acordo com o arquivo `docker-compose.yml`, os ambientes devem rodar nos seguintes endereços:

#### Frontend (Vue 3 + Vuetify)

- http://localhost:5173

#### Backend (Node + Express)

- http://localhost:3000/upload
- http://localhost:3000/list
- http://localhost:3000/list/export

#### Database (Postgre)

- http://localhost:5432

### Gerenciamento de containers

Cria os containers e os mantém ativos em segundo plano:

```bash
docker compose up -d --build
```

Inativa os containers e mantém seus volumes:

```bash
docker compose down
```

Inativa os containers e remove os volumes, limpando o banco de dados:

```bash
docker compose down -v
```

Lista os containers, ativos e inativos:

```bash
docker ps -a
```

Monitora os logs do container:

```bash
docker logs -f ${container_id ou container_name ex: 'ipdv_backend'}
```

### Migrations

Cria uma nova migration:

```bash
docker compose exec backend npx node-pg-migrate create nome-da-migration
```

Aplica as migrations pendentes:

```bash
docker compose exec backend npm run migrate up
```

Desfaz a última migration aplicada:

```bash
docker compose exec backend npm run migrate down
```
