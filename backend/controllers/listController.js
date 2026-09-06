const pool = require("../db/pool");

const listController = async (req, res) => {
  // TODO:
  try {
    const result = await pool.query("SELECT * FROM bandeiras");
    res.json({ status: "ok", data: result.rows });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

module.exports = listController;
