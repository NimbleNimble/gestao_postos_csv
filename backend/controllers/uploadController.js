const pool = require("../db/pool");

const uploadController = async (req, res) => {
  try {
    const validationError = validateFile(req);
    if (validationError) {
      return res.status(400).json(validationError);
    }

    const jsonData = convertCsvToJson(req);
    for (const element of jsonData) {
      const responsavelId = await createResponsavel({
        cpf: element.cpf_responsavel?.trim(),
        nome: element.nome_responsavel?.trim(),
        email: element.email_responsavel?.trim(),
        cargo: element.cargo_responsavel?.trim(),
      });

      const bandeiraId = await createBandeira(element.bandeira?.trim());

      const municipioId = await createMunicipio({
        nome: element.municipio?.trim(),
        uf: element.uf?.trim(),
      });

      const statusId = await createStatus(element.status?.trim());

      const dataInauguracao = formatDataInauguracao(
        element.data_inauguracao?.trim(),
      );

      const postoId = await createPosto({
        responsavel_id: responsavelId,
        bandeira_id: bandeiraId,
        municipio_id: municipioId,
        status_id: statusId,
        cnpj: element.cnpj?.trim(),
        nome: element.nome_posto?.trim(),
        nome_fantasia: element.nome_fantasia?.trim(),
        logradouro: element.logradouro?.trim(),
        numero: element.numero ? parseInt(element.numero, 10) : null,
        complemento: element.complemento?.trim(),
        bairro: element.bairro?.trim(),
        cep: element.cep?.trim(),
        data_inauguracao: dataInauguracao,
        numero_bicos: element.numero_bicos
          ? parseInt(element.numero_bicos, 10)
          : null,
        numero_pistas: element.numero_pistas
          ? parseInt(element.numero_pistas, 10)
          : null,
        observacoes: element.observacoes?.trim(),
      });

      const combustiveisIds = await createCombustiveis(element.combustiveis);

      await createPostosCombustiveis(postoId, combustiveisIds);
    }

    res.json({
      status: "ok",
      filename: req.file.originalname,
      size: req.file.size,
      dataCount: jsonData?.length || 0,
      data: jsonData || [],
    });
  } catch (err) {
    console.error("Erro no processamento do upload:", err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const formatDataInauguracao = (dateStr) => {
  if (!dateStr) return null;

  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
    throw new Error(
      `Data de inauguração inválida: "${dateStr}". O formato deve ser DD/MM/AAAA.`,
    );
  }

  const [day, month, year] = dateStr.split("/");
  return `${year}-${month}-${day}`;
};

const validateFile = (req) => {
  const file = req.file;
  const isEmptyFile = !file || file.size === 0;
  const isCsvFile = file?.originalname.toLowerCase().endsWith(".csv");
  const isValid = !isEmptyFile && isCsvFile;

  if (isValid) {
    return null;
  } else if (!isCsvFile) {
    return {
      status: "error",
      message: "Extensão inválida. Arquivo enviado não é CSV",
    };
  } else {
    return { status: "error", message: "Nenhum arquivo enviado" };
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
          numero_bicos,
          numero_pistas,
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
        data.numero_bicos,
        data.numero_pistas,
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
  try {
    const queries = combustiveisIds.map((combustivelId) =>
      pool.query(
        `
          INSERT INTO postos_combustiveis (posto_id, combustivel_id)
          VALUES ($1, $2)
          ON CONFLICT (posto_id, combustivel_id)
          DO UPDATE SET posto_id = EXCLUDED.posto_id, combustivel_id = EXCLUDED.combustivel_id
        `,
        [postoId, combustivelId],
      ),
    );

    await Promise.all(queries);
  } catch (err) {
    console.error("Error inserting postos_combustiveis:", err.message);
    throw err;
  }
};

module.exports = uploadController;
