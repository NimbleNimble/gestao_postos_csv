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
  pgm.createTable("municipios", {
    id: "id",
    nome: { type: "varchar(255)", notNull: true, unique: true },
    uf: { type: "char(2)", notNull: true },
  });

  pgm.addConstraint("municipios", "municipios_nome_uf_unique", {
    unique: ["nome", "uf"],
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("municipios");
};
