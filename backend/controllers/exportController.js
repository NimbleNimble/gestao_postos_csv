const { getPostos } = require("./listController");

const exportController = async (req, res) => {
  try {
    const rows = await getPostos();

    if (!rows.length) {
      return res.status(404).json({
        status: "error",
        message: "Nenhum dado encontrado",
      });
    }

    const columns = Object.keys(rows[0]);

    const escapeCsv = (value) => {
      if (value === null || value === undefined) return "";
      const text = String(value).trim().replace(/"/g, '""');
      return /[";\r\n]/.test(text) ? `"${text}"` : text;
    };

    const csv = [
      columns.join(";"),
      ...rows.map((row) =>
        columns.map((column) => escapeCsv(row[column])).join(";"),
      ),
    ].join("\r\n");

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", 'attachment; filename="postos.csv"');

    res.send(csv);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = { exportController };
