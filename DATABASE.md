## Modelagem DB

### postos
- id (PK)
- responsavel_id (FK -> responsaveis.id)
- bandeira_id (FK -> bandeiras.id)
- municipio_id (FK -> municipios.id)
- cnpj (UNIQUE)
- nome (UNIQUE)
- nome_fantasia
- logradouro
- numero
- complemento
- bairro
- cep
- status // TODO: Enum ou realacional
- data_inauguracao (DATE)
- numero_de_bicos
- numero_de_pistas
- observacoes

### responsaveis
- id (PK)
- cpf (UNIQUE)
- nome
- email (UNIQUE)
- cargo // TODO: Enum ou realacional

### bandeiras
- id (PK)
- nome (UNIQUE)

### combustiveis
- id (PK)
- nome (UNIQUE)

### municipios
- id (PK)
- nome
- uf (CHAR 2)

### postos_combustiveis
- posto_id (FK -> postos.id)
- combustivel_id (FK -> combustiveis.id)

