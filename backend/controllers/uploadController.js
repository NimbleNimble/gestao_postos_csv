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

    const combustiveisIds = await createCombustiveis(element.combustiveis);

    const municipioId = await createMunicipio({
      nome: element.municipio,
      uf: element.uf,
    });

    const statusId = await createStatus(element.status);

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
  console.log("Creating municipio with data:", data);
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

const createPosto = (data) => {
  // TODO: mock
  const id = 11223;
  return id;
};

const createPostosCombustiveis = (postoId, combustivelId) => {
  // TODO: mock
  const id = 99887;
  return id;
};

module.exports = uploadController;
