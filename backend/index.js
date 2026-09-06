const express = require("express");
const cors = require("cors");

const uploadRoutes = require("./routes/uploadRoutes");

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use("/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Backend rodando na porta ${port}`);
});
