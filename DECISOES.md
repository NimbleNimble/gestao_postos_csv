## 1. Escolha das Tecnologias e Bibliotecas

A aplicação foi desenvolvida com uma stack simples e eficiente para o escopo do desafio: **Vue.js**, **Vuetify**, **Node.js + Express** e **PostgreSQL**. Essa combinação alinha bem com a necessidade de interface web, processamento de arquivos CSV e persistência relacional de forma organizada e escalonável.

> Todo o processamento de dados, incluindo importação, exportação, formatação e persistência, é realizado pelo backend, o que facilita a manutenção, segue boas práticas e melhora a performance geral do sistema.

### Bibliotecas e motivos de uso

- **Multer:** utilizado para receber os arquivos enviados via `multipart/form-data`, armazenando-os em memória com `MemoryStorage` e convertendo o conteúdo diretamente em `Buffer`. Isso agiliza o processamento do upload para arquivos de tamanho moderado sem necessidade de salvar temporariamente no disco.
- **CORS:** essencial para permitir que o frontend, executado em uma porta/host diferente, consiga consumir os endpoints do backend sem bloqueios de segurança do navegador.

---

## 2. Modelagem Relacional e Normalização do Banco

Cada linha do CSV importado contém informações de duas entidades principais. Para representá-las de forma organizada, o banco foi modelado com tabelas separadas para **postos** e **responsáveis**.

A fim de evitar duplicidade e redundância de dados, também foram criadas tabelas de apoio para relacionamentos 1:n. Entidades como **bandeiras**, **combustíveis** e **status** poderiam ser armazenadas como colunas do tipo `ENUM` na tabela de postos, mas essa abordagem limitaria a inserção de novos valores no futuro e aumentaria a rigidez do schema.

O mesmo raciocínio vale para a tabela de **municípios**: o banco permite cidades com o mesmo nome desde que pertençam a unidades federativas diferentes, evitando conflitos e preservando a integridade dos dados.

Além disso, foi criada a tabela `postos_combustiveis` para representar o relacionamento n:n entre postos e combustíveis, permitindo que um posto venda vários produtos e que um combustível esteja associado a vários postos ao mesmo tempo.

A arquitetura completa do banco está descrita em `DATABASE.md`.

- **Chaves únicas (`UNIQUE`):**
  - `cnpj` na tabela `postos` garante idempotência na importação.
  - `cpf` na tabela `responsaveis` permite verificar se o responsável já está cadastrado antes de inserir um novo registro.
  - `nome` em `bandeiras` e `combustiveis` evita duplicidade de termos parecidos.

## 3. Considerações Finais

O projeto foi pensado para equilibrar simplicidade, clareza de modelagem e capacidade de evolução. A estrutura relacional escolhida facilita manutenção, evita redundância e permite que o sistema suporte novos registros e regras de negócio sem necessariamente alterar a lógica principal de importação e exportação.

> Observação: o GitFlow foi ignorado por se tratar de um projeto pequeno, não publicado e desenvolvido por uma única pessoa.
