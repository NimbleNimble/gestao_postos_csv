## Modelagem DB

### postos
- id (PK)
- responsavel_id (FK -> responsaveis.id)
- bandeira_id (FK -> bandeiras.id)
- municipio_id (FK -> municipios.id)
- status_id (FK -> status.id)
- cnpj (UNIQUE/CHAR 14)
- nome (UNIQUE/VARCHAR)
- nome_fantasia (VARCHAR)
- logradouro (VARCHAR)
- numero (INT)
- complemento (VARCHAR)
- bairro (VARCHAR)
- cep (VARCHAR 8)
- data_inauguracao (DATE)
- numero_de_bicos (INT)
- numero_de_pistas (INT)
- observacoes (VARCHAR)

### responsaveis
- id (PK)
- cpf (UNIQUE/CHAR 11)
- nome (VARCHAR)
- email (UNIQUE/VARCHAR)
- cargo (VARCHAR)

### bandeiras
- id (PK)
- nome (UNIQUE/VARCHAR)

### combustiveis
- id (PK)
- nome (UNIQUE/VARCHAR)

### municipios
- id (PK)
- nome (VARCHAR)
- uf (CHAR 2)

### postos_combustiveis
- posto_id (FK -> postos.id)
- combustivel_id (FK -> combustiveis.id)

### status
- id (PK)
- nome (VARCHAR)
