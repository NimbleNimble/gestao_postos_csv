## Modelagem DB

### postos
- id
- cnpj
- nome
- nome_fantasia
- fk_bandeira
- logradouro
- numero
- complemento
- bairro
- municipio
- uf
- cep
- fk_responsavel
- status
- data_inauguracao
- numero_de_bicos
- numero_de_pistas
- observacoes

### responsaveis
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
