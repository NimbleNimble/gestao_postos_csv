const express = require("express");
const cors = require("cors");
const mainRoutes = require("./routes/mainRoutes");

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use("/postos", mainRoutes);

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Backend rodando na porta ${port}`);
});
