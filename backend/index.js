const express = require("express");
const cors = require("cors");
const pool = require("./db/pool");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use("/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.json({ status: "ok" });
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
