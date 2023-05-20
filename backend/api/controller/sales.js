const pool = require("../dbConf");
const queries = require("../queries");

const getAll = async (req, res) => {
  try {
    const [rows, fields] = await pool.query(queries.selectAllSales);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Unable to retrieve sales data. Please try again later.");
  }
};

const getById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const [rows, fields] = await pool.query(queries.selectSalesById, [id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Unable to retrieve sale datum. Please try again later.");
  }
};

const create = async (req, res) => {
  const { customer_name, date_of_sale } = req.body;
  try {
    const [rows, fields] = await pool.execute(queries.insertSales, [
      customer_name,
      date_of_sale,
    ]);
    res
      .status(200)
      .json({
        msg: `${rows.affectedRows} sale datum successfully added with id: ${rows.insertId}`,
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to add sales. Please try again later.");
  }
};

const update = async (req, res) => {
  const id = parseInt(req.params.id);
  const { customer_name, date_of_sale } = req.body;

  try {
    const [rows, fields] = await pool.execute(queries.updateSales, [
      customer_name,
      date_of_sale,
      id,
    ]);
    res
      .status(200)
      .send(
        `${rows.affectedRows} sale datum successfully updated with id: ${id}`
      );
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to update sales. Please try again later.");
  }
};

const remove = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const [rows, fields] = await pool.execute(queries.removeSales, [id]);
    res
      .status(200)
      .send(
        `${rows.affectedRows} sale datum Successfully deleted with id: ${id}`
      );
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to delete sales. Please try again later.");
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
