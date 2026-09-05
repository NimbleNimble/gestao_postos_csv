/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable("postos", {
    id: "id",
    responsavel_id: { type: "integer", notNull: true },
    bandeira_id: { type: "integer", notNull: true },
    municipio_id: { type: "integer", notNull: true },
    status_id: { type: "integer", notNull: true },
    cnpj: { type: "char(14)", notNull: true, unique: true },
    nome: { type: "varchar(255)", notNull: true, unique: true },
    nome_fantasia: { type: "varchar(255)" },
    logradouro: { type: "varchar(255)" },
    numero: { type: "integer" },
    complemento: { type: "varchar(255)" },
    bairro: { type: "varchar(255)" },
    cep: { type: "char(8)" },
    data_inauguracao: { type: "date" },
    numero_de_bicos: { type: "integer" },
    numero_de_pistas: { type: "integer" },
    observacoes: { type: "varchar(500)" },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("postos");
};
