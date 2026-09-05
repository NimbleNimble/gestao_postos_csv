## Modelagem DB

### postos
- id (PK)
- responsavel_id (FK)
- bandeira (FK)
- cnpj
- nome
- nome_fantasia
- logradouro
- numero
- complemento
- bairro
- municipio
- uf
- cep
- status
- data_inauguracao
- numero_de_bicos
- numero_de_pistas
- observacoes

### responsaveis
- id (PK)
- cpf_responsavel
- nome_responsavel
- email_responsavel
- cargo_responsavel

### bandeiras
- id (PK)
- nome

### combustiveis
- id (PK)
- nome

### postos_combustiveis
- posto_id (FK)
- combustivel_id (FK)
