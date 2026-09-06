const uploadController = (req, res) => {
  validateFile(req, res);

  const data = convertCsvToJson(req);

  res.json({
    status: "ok",
    filename: req.file.originalname,
    size: req.file.size,
    dataCount: data?.length || 0,
    data: data || [],
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
  const lines = content.split(/\r?\n/).filter(Boolean);
  const headers = lines[0].split(";");
  return lines.slice(1).map((line) => {
    const values = line.split(";");
    return headers.reduce((acc, header, index) => {
      acc[header] = values[index];
      return acc;
    }, {});
  });
};

module.exports = uploadController;
