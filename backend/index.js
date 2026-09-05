const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 3000;
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/upload", upload.single("file"), (req, res) => {
  const isEmptyFile = !req.file || req.file.size === 0;
  const isCsvFile = req.file && req.file.originalname.endsWith(".csv");
  const isValid = () => !isEmptyFile && isCsvFile;

  if (!isValid()) {
    const errorMessage = !isCsvFile ? "Extensão inválida. Arquivo enviado não é CSV" : "Nenhum arquivo enviado";
    return res.status(400).json({
      status: "error",
      message: errorMessage,
    });
  }

  const content = req.file.buffer.toString("utf-8");
  const lines = content.split(/\r?\n/).filter(Boolean);
  const headers = lines[0].split(";");
  const data = lines.slice(1).map((line) => {
    const values = line.split(";");
    return headers.reduce((acc, header, index) => {
      acc[header] = values[index];
      return acc;
    }, {});
  });

  res.json({
    status: "ok",
    filename: req.file.originalname,
    size: req.file.size,
    dataCount: data.length,
    data: data,
  });
});

app.post("/insert-sample-flag", async (req, res) => {
  try {
    const result = await pool.query(
      "INSERT INTO bandeiras (nome) values ('PETROBRAS')",
    );
    res.json({ status: "ok" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Backend rodando na porta ${port}`);
});
