const pool = require("../db/pool");

const uploadController = async (req, res) => {
  validateFile(req, res);

  const jsonData = convertCsvToJson(req);
  jsonData.map(async (element) => {
    const responsavelId = await createResponsavel({
      cpf: element.cpf_responsavel,
      nome: element.nome_responsavel,
      email: element.email_responsavel,
      cargo: element.cargo_responsavel,
    });

    const bandeiraId = await createBandeira(element.bandeira);

    const municipioId = await createMunicipio({
      nome: element.municipio,
      uf: element.uf,
    });

    const statusId = await createStatus(element.status);

    const postoId = await createPosto({
      responsavel_id: responsavelId,
      bandeira_id: bandeiraId,
      municipio_id: municipioId,
      status_id: statusId,
      cnpj: element.cnpj,
      nome: element.nome_posto,
      nome_fantasia: element.nome_fantasia,
      logradouro: element.logradouro,
      numero: element.numero,
      complemento: element.complemento,
      bairro: element.bairro,
      cep: element.cep,
      data_inauguracao: element.data_inauguracao,
      numero_de_bicos: element.numero_bicos,
      numero_de_pistas: element.numero_pistas,
      observacoes: element.observacoes,
    });

    const combustiveisIds = await createCombustiveis(element.combustiveis);

    await createPostosCombustiveis(postoId, combustiveisIds);
  });

  res.json({
    status: "ok",
    filename: req.file.originalname,
    size: req.file.size,
    dataCount: jsonData?.length || 0,
    data: jsonData || [],
  });
};

const validateFile = (req, res) => {
  const isEmptyFile = !req.file || req.file.size === 0;
  const isCsvFile = req.file?.originalname.toLowerCase().endsWith(".csv");
  const isValid = !isEmptyFile && isCsvFile;

  if (!isValid) {
    const errorMessage = !isCsvFile
      ? "Extensão inválida. Arquivo enviado não é CSV"
      : "Nenhum arquivo enviado";
    return res.status(400).json({
      status: "error",
      message: errorMessage,
    });
  }
};

const convertCsvToJson = (req) => {
  const content = req.file.buffer.toString("utf-8");
  const lines = content.trim().split(/\r?\n/).filter(Boolean);
  const headers = lines[0].split(";");
  return lines.slice(1).map((line) => {
    const values = line.split(";");
    return headers.reduce((acc, header, index) => {
      acc[header] = values[index];
      return acc;
    }, {});
  });
};

const createResponsavel = async (data) => {
  try {
    const result = await pool.query(
      `
      INSERT INTO responsaveis (cpf, nome, email, cargo)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (cpf)
      DO UPDATE SET nome = EXCLUDED.nome, email = EXCLUDED.email, cargo = EXCLUDED.cargo
      RETURNING id
    `,
      [data.cpf, data.nome, data.email, data.cargo],
    );
    return result.rows[0].id;
  } catch (err) {
    console.error("Error inserting responsavel:", err.message);
    throw err;
  }
};

const createBandeira = async (nomeBandeira) => {
  try {
    const result = await pool.query(
      `
        INSERT INTO bandeiras (nome)
        VALUES ($1)
        ON CONFLICT (nome)
        DO UPDATE SET nome = EXCLUDED.nome
        RETURNING id
      `,
      [nomeBandeira],
    );

    return result.rows[0].id;
  } catch (err) {
    console.error("Error inserting bandeira:", err.message);
    throw err;
  }
};

const createCombustiveis = async (combustiveisString) => {
  const combustiveisArray = combustiveisString.split(",");

  const combustiveisIds = combustiveisArray.reduce(async (acc, combustivel) => {
    const result = await pool.query(
      `
        INSERT INTO combustiveis (nome)
        VALUES ($1)
        ON CONFLICT (nome)
        DO UPDATE SET nome = EXCLUDED.nome
        RETURNING id
      `,
      [combustivel],
    );

    const accResolved = await acc;
    accResolved.push(result.rows[0].id);
    return accResolved;
  }, Promise.resolve([]));

  return combustiveisIds;
};

const createMunicipio = async (data) => {
  try {
    const result = await pool.query(
      `
        INSERT INTO municipios (nome, uf)
        VALUES ($1, $2)
        ON CONFLICT (nome, uf)
        DO UPDATE SET nome = EXCLUDED.nome, uf = EXCLUDED.uf
        RETURNING id
      `,
      [data.nome, data.uf],
    );

    return result.rows[0].id;
  } catch (err) {
    console.error("Error inserting municipio:", err.message);
    throw err;
  }
};

const createStatus = async (status) => {
  try {
    const result = await pool.query(
      `
        INSERT INTO status (nome)
        VALUES ($1)
        ON CONFLICT (nome)
        DO UPDATE SET nome = EXCLUDED.nome
        RETURNING id
      `,
      [status],
    );

    return result.rows[0].id;
  } catch (err) {
    console.error("Error inserting status:", err.message);
    throw err;
  }
};

const createPosto = async (data) => {
  try {
    const result = await pool.query(
      `
        INSERT INTO postos (
          responsavel_id,
          bandeira_id,
          municipio_id,
          status_id,
          cnpj,
          nome,
          nome_fantasia,
          logradouro,
          numero,
          complemento,
          bairro,
          cep,
          data_inauguracao,
          numero_de_bicos,
          numero_de_pistas,
          observacoes
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        ON CONFLICT (cnpj)
        DO UPDATE SET cnpj = EXCLUDED.cnpj
        RETURNING id
      `,
      [
        data.responsavel_id,
        data.bandeira_id,
        data.municipio_id,
        data.status_id,
        data.cnpj,
        data.nome,
        data.nome_fantasia,
        data.logradouro,
        data.numero,
        data.complemento,
        data.bairro,
        data.cep,
        data.data_inauguracao,
        data.numero_de_bicos,
        data.numero_de_pistas,
        data.observacoes,
      ],
    );

    return result.rows[0].id;
  } catch (err) {
    console.error("Error inserting posto:", err.message);
    throw err;
  }
};

const createPostosCombustiveis = async (postoId, combustiveisIds) => {
  // TODO: mock
  const id = 99887;
  return id;
};

module.exports = uploadController;
