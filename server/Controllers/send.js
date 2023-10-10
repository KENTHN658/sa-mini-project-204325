const connectDB = require("../Config/db");
const connection = connectDB();

exports.list = async (req, res) => {
  try {
    const id = req.params.id;
    connection.query("SELECT * FROM send WHERE supid = ?",[id], (queryErr, results) => {
      if (queryErr) {
        console.error("Error executing query:", queryErr);
        res.status(500).json({ error: "Error executing query" });
        return;
      }
      res.status(200).json(results);
    });
  } catch (err) {
    console.error("An unexpected error occurred:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.create = async (req, res) => {
  let value1 = 0;
  let value2 = 0;

  try {
    const { supid, goodsid, unitcost, unitsend, exp } = req.body;
    connection.query(
      "SELECT allgoods FROM unitprice WHERE goodsid=?",
      [goodsid],
      (err, result, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        if (result.length === 0) {
          return res.status(400).send();
        } else {
          value1 = parseInt(result[0].allgoods) + parseInt(unitsend);
          let sql =
            "INSERT INTO send(supid, goodsid, unitcost, unitsend, exp ) VALUES(?,?,?,?,?)";
          connection.query(
            sql,
            [supid, goodsid, unitcost, unitsend, exp],
            (err, results, fields) => {
              if (err) {
                console.log(err);
                return res.status(400).send();
              }
              return res.status(201);
            }
          );
        }
        number_of_goods = connection.query(
          "UPDATE  unitprice SET allgoods = ? WHERE goodsid = ?",
          [value1, goodsid],
          (err, result) => {
            if (err) {
              console.log(err);
              return res.status(400).send();
            }
            console.log(result);
          }
        );

        return res.status(201).send();
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};
