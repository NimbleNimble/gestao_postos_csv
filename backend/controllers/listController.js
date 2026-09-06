const pool = require("../db/pool");

const listController = async (req, res) => {
  // TODO: Continuar aqui
  try {
    const result = await pool.query(
      `SELECT p.cnpj, p.nome as nome_posto, p.nome_fantasia, b.nome as bandeira, p.logradouro, p.numero, p.complemento, p.bairro, m.nome as municipio, m.uf, p.cep, r.cpf as cpf_responsavel, r.nome as nome_responsavel, r.email as email_responsavel, r.cargo as cargo_responsavel, (SELECT STRING_AGG(c.nome, ', ' ORDER BY c.nome DESC) FROM postos_combustiveis pc
join combustiveis c on c.id = pc.combustivel_id 
 where pc.posto_id = p.id) as combustiveis, s.nome as status, p.data_inauguracao, p.numero_bicos, p.numero_pistas, p.observacoes  from postos p
join responsaveis r ON r.id = p.responsavel_id  
join bandeiras b on b.id = p.bandeira_id 
join municipios m on m.id = p.municipio_id 
join status s on s.id = p.status_id`,
    );
    res.json({ status: "ok", data: result.rows });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

module.exports = listController;
