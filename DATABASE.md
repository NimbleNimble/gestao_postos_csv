## Modelagem DB

### postos
- id (PK)
- responsavel_id (FK -> responsaveis.id)
- bandeira_id (FK -> bandeiras.id)
- municipio_id (FK -> municipios.id)
- status_id (FK -> status.id)
- cnpj (UNIQUE)
- nome (VARCHAR/UNIQUE)
- nome_fantasia (VARCHAR)
- logradouro (VARCHAR)
- numero (INT)
- complemento (VARCHAR)
- bairro (VARCHAR)
- cep
- data_inauguracao (DATE)
- numero_de_bicos (INT)
- numero_de_pistas (INT)
- observacoes (VARCHAR)

### responsaveis
- id (PK)
- cpf (UNIQUE)
- nome (VARCHAR)
- email (UNIQUE)
- cargo (VARCHAR)

### bandeiras
- id (PK)
- nome (VARCHAR/UNIQUE)

### combustiveis
- id (PK)
- nome (VARCHAR/UNIQUE)

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
