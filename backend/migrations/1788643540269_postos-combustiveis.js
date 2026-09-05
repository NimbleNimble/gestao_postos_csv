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
  pgm.createTable("postos_combustiveis", {
    id: "id",
    posto_id: {
      type: "integer",
      notNull: true,
      references: '"postos"',
      onDelete: "RESTRICT",
    },
    combustivel_id: {
      type: "integer",
      notNull: true,
      references: '"combustiveis"',
      onDelete: "RESTRICT",
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("postos_combustiveis");
};
