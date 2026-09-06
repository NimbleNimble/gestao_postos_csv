// TODO: Anotações

/* Colunas do CSV */
// cnpj
// nome_posto
// nome_fantasia
// bandeira
// logradouro
// numero
// complemento
// bairro
// municipio
// uf
// cep
// cpf_responsavel
// nome_responsavel
// email_responsavel
// cargo_responsavel
// combustiveis
// status
// data_inauguracao
// numero_bicos
// numero_pistas
// observacoes

const uploadController = (req, res) => {
  validateFile(req, res);

  const jsonData = convertCsvToJson(req);
  jsonData.forEach((element) => {
    const responsavelId = createResponsavel(
      element.map((item) => ({
        cpf: item.cpf_responsavel,
        nome: item.nome_responsavel,
        email: item.email_responsavel,
        cargo: item.cargo_responsavel,
      })),
    );

    const bandeiraId = createBandeira(
      element.map((item) => ({
        nome: item.bandeira,
      })),
    );

    const combustivelId = createCombustivel(
      element.map((item) => ({
        nome: item.combustiveis,
      })),
    );

    const municipioId = createMunicipio(
      element.map((item) => ({
        nome: item.municipio,
        uf: item.uf,
      })),
    );

    const statusId = createStatus(
      element.map((item) => ({
        nome: item.status,
      })),
    );

    const postoId = createPosto(
      element.map((item) => ({
        responsavel_id: responsavelId,
        bandeira_id: bandeiraId,
        municipio_id: municipioId,
        status_id: statusId,
        cnpj: item.cnpj,
        nome: item.nome_posto,
        nome_fantasia: item.nome_fantasia,
        logradouro: item.logradouro,
        numero: item.numero,
        complemento: item.complemento,
        bairro: item.bairro,
        cep: item.cep,
        data_inauguracao: item.data_inauguracao,
        numero_de_bicos: item.numero_bicos,
        numero_de_pistas: item.numero_pistas,
        observacoes: item.observacoes,
      })),
    );
  });

  createPostosCombustiveis(postoId, combustivelId);

  // POSTOS_COMBUSTIVEIS
  // id_posto
  // id_combustivel

  res.json({
    status: "ok",
    filename: req.file.originalname,
    size: req.file.size,
    dataCount: jsonData?.length || 0,
    data: jsonData || [],
    responsavelId,
    bandeiraId,
    combustivelId,
    municipioId,
    statusId,
    postoId,
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

const createResponsavel = (data) => {
  // TODO: mock
  const id = 52364;
  return id;
};

const createBandeira = (data) => {
  // TODO: mock
  const id = 12345;
  return id;
};

const createCombustivel = (data) => {
  // TODO: mock
  const id = 67890;
  return id;
};

const createMunicipio = (data) => {
  // TODO: mock
  const id = 24680;
  return id;
};

const createStatus = (data) => {
  // TODO: mock
  const id = 13579;
  return id;
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
