## Modelagem DB

### postos
- id (PK)
- responsavel_id (FK)
- bandeira_id (FK)
- cnpj (UNIQUE)
- nome (UNIQUE)
- nome_fantasia
- logradouro
- numero
- complemento
- bairro
- municipio // TODO: deve ser criado relacionamento tbm?
- uf // TODO: mannter sigla?
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

### postos_combustiveis
- posto_id (FK)
- combustivel_id (FK)
