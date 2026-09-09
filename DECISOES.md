# Decisões técnicas

## 1. Modelagem do banco

Foi utilizado um modelo relacional no PostgreSQL, sem ORM, usando o pacote "pg".

O modelo relacional foi escolhido para reduzir a repetição de dados e representar corretamente os relacionamentos.

A tabela "postos' armazena os dados principais e possui relacionamentos com:

- "responsaveis"
- "bandeiras"
- "municipios"
- "status"
- "combustiveis", (por meio da tabela "postos_combustiveis")

Essa separação evita repetição de dados e representa corretamente os relacionamentos:

- **Responsável e Posto** - Um responsável pode estar associado a vários postos (1:N)
- **Bandeira e Posto** - Uma bandeira pode estar associada a vários postos (1:N)
- **Município e Posto** - Um município pode possuir vários postos (1:N)
- **Status e Posto** - Um status pode estar associado a vários postos (1:N)
- **Combustível e Posto** - Um posto pode comercializar vários combustíveis, e um combustível pode estar associado a vários postos (N:N)

Foram utilizadas restrições "UNIQUE" para evitar duplicidades.

- O campo "cnpj" identifica unicamente um **posto**.
- O "cpf" identifica um **responsável**.
- Cada registro de **bandeira**, **combustível** e **status** é identificada respectivamente referência "nome".
- Para **municípios**, utiliza-se a combinação de "nome" + "uf", pois cidades com o mesmo nome podem existir em estados diferentes.

## 2. Importação, validação e duplicidades

O backend recebe arquivos CSV separados por ponto e vírgula.

A importação:

- verifica se o arquivo existe, não está vazio e possui extensão ".csv"
- valida a presença de todos os cabeçalhos
- valida os campos obrigatórios de cada linha
- remove espaços extras dos valores
- converte a data para o formato padrão
- separa a lista de combustíveis por vírgula

Os campos obrigatórios por linha são:
"cnpj", "nome_posto", "bandeira", "logradouro", "bairro", "municipio", "uf", "cep", "cpf_responsavel", "nome_responsavel", "combustiveis" e "status".

Os demais campos podem ficar vazios sem gerar erros.

O CNPJ é utilizado para identificar se o posto já existe. Registros duplicados não criam novos postos. As tabelas de referência reutilizam registros existentes por meio de chaves únicas e "ON CONFLICT".

Combustíveis que ainda não existem são cadastrados automaticamente durante a importação.

## 3. Exportação

A exportação é feita pelo backend e mantém o mesmo formato do arquivo de entrada:

- mesmas colunas
- mesma ordem
- separador ";"
- combustíveis agrupados em uma única coluna, com vírgulas e sem espaço entre eles, conforme referência original
- datas no formato "DD/MM/AAAA"

Os dados são reconstruídos com JOINs e STRING_AGG, combinando as informações normalizadas em uma única linha compatível com o formato de entrada.

## 4. Trade-offs

A solução atual foi implementada para atender ao volume esperado do desafio.
A exportação consulta os dados e monta o CSV em memória, o que simplifica a implementação e é suficiente para esse volume.
Para bases significativamente maiores, seria preferível utilizar streaming, evitando manter todo o resultado em memória.

Para manter a primeira versão simples, foram assumidas algumas limitações:

- o upload carrega o arquivo inteiro em memória
- a exportação monta o CSV antes de enviá-lo
- a listagem retorna todos os registros
- A importação ainda não utiliza uma transação única para todo o arquivo. Cada linha é processada individualmente. Se ocorrer um erro no meio do processamento os registros anteriores podem permanecer salvos, enquanto os registros seguintes não serão processados.
- O parser atende ao formato esperado pelo desafio, mas não trata todos os formatos possíveis de CSV, como por exemplo um campo que contenha ponto e vírgula (";")

Essas escolhas são adequadas para o escopo inicial, mas precisam ser revistas para volumes ainda maiores.

## 5. O que faria diferente com mais tempo

- Utilizaria processamento em stream para importação e exportação
- Adicionaria transações e inserções em lote
- Implementaria paginação na listagem
- Exibiria um relatório detalhado de linhas importadas e rejeitadas
- Utilizaria uma biblioteca completa para parsing de CSV
- Adicionaria testes automatizados para validação, duplicidades e reimportação
- Faria validações mais completas de CPF e CNPJ
- Criaria outros relatórios analíticos para cruzar os dados importados, como por exemplo ranking de:
- - Responsáveis com maior número de postos
- - Bandeiras com maior quantidade de postos
- - Município, com quantidade de postos e bandeiras utilizadas
- Implementaria busca e filtros para localizar postos por nome, nome fantasia ou CNPJ, além de permitir a busca por nome ou CPF do responsável.
