const pool = require("../db/pool");

const getPostos = async () => {
  const result = await pool.query(
    `SELECT 
            p.cnpj, 
            p.nome AS nome_posto, 
            p.nome_fantasia, 
            b.nome AS bandeira, 
            p.logradouro, 
            p.numero, 
            p.complemento, 
            p.bairro, 
            m.nome AS municipio, 
            m.uf, 
            p.cep, 
            r.cpf AS cpf_responsavel, 
            r.nome AS nome_responsavel, 
            r.email AS email_responsavel, 
            r.cargo AS cargo_responsavel, 
            COALESCE(STRING_AGG(c.nome, ', ' ORDER BY c.nome DESC), '') AS combustiveis, 
            s.nome AS status, 
            p.data_inauguracao, 
            p.numero_bicos, 
            p.numero_pistas, 
            p.observacoes 
        FROM postos p
        LEFT JOIN responsaveis r ON r.id = p.responsavel_id 
        LEFT JOIN bandeiras b ON b.id = p.bandeira_id 
        LEFT JOIN municipios m ON m.id = p.municipio_id 
        LEFT JOIN status s ON s.id = p.status_id
        LEFT JOIN postos_combustiveis pc ON pc.posto_id = p.id
        LEFT JOIN combustiveis c ON c.id = pc.combustivel_id
        GROUP BY 
            p.id, 
            b.nome, 
            m.nome, 
            m.uf, 
            r.cpf, 
            r.nome, 
            r.email, 
            r.cargo, 
            s.nome;
      `,
  );
  return result.rows;
};

const listController = async (req, res) => {
  try {
    const rows = await getPostos();
    res.json({ status: "ok", data: rows });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

const exportController = async (req, res) => {
  try {
    const rows = await getPostos();

    if (!rows.length) {
      return res.status(404).json({
        status: "error",
        message: "Nenhum dado encontrado",
      });
    }

    const columns = Object.keys(rows[0]);

    const escapeCsv = (value) => {
      if (value === null || value === undefined) return "";
      const text = String(value).replace(/"/g, '""');
      return /[",\r\n]/.test(text) ? `"${text}"` : text;
    };

    const csv = [
      columns.join(";"),
      ...rows.map((row) =>
        columns.map((column) => escapeCsv(row[column])).join(";"),
      ),
    ].join("\r\n");

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", 'attachment; filename="postos.csv"');

    res.send(csv);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = {
  listController,
  exportController,
};
