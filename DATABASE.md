## Modelagem DB

### postos

- id (PK)
- responsavel_id (FK -> responsaveis.id)
- bandeira_id (FK -> bandeiras.id)
- municipio_id (FK -> municipios.id)
- status_id (FK -> status.id)
- cnpj (UNIQUE/CHAR 14/NOTNULL)
- nome (UNIQUE/VARCHAR/NOTNULL)
- nome_fantasia (VARCHAR)
- logradouro (VARCHAR)
- numero (INT)
- complemento (VARCHAR)
- bairro (VARCHAR)
- cep (VARCHAR 8)
- data_inauguracao (DATE)
- numero_bicos (INT)
- numero_pistas (INT)
- observacoes (VARCHAR)

### responsaveis

- id (PK)
- cpf (UNIQUE/CHAR 11/NOTNULL)
- nome (VARCHAR/NOTNULL)
- email (UNIQUE/VARCHAR/NOTNULL)
- cargo (VARCHAR/NOTNULL)

### bandeiras

- id (PK)
- nome (UNIQUE/VARCHAR/NOTNULL)

### combustiveis

- id (PK)
- nome (UNIQUE/VARCHAR/NOTNULL)

### municipios

- id (PK)
- nome (UNIQUE/VARCHAR/NOTNULL)
- uf (CHAR 2/NOTNULL)

### postos_combustiveis

- posto_id (FK -> postos.id)
- combustivel_id (FK -> combustiveis.id)

### status

- id (PK)
- nome (UNIQUE/VARCHAR/NOTNULL)
