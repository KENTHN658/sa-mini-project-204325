const connectDB = require("../Config/db");
const connection = connectDB();

exports.list = async (req, res) => {
  try {
    connection.query("SELECT * FROM unitprice", (queryErr, results) => {
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
  try {
    const { supid, goodsid, goodsname, allgoods, unitprice } = req.body;

    let sql =
      "INSERT INTO unitprice(supid, goodsid, goodsname, allgoods, unitprice ) VALUES(?,?,?,?,?)";
    connection.query(
      sql,
      [supid, goodsid, goodsname, allgoods, unitprice ],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        return res.status(201);
      }
    );
    res.send("บันทึกสำเร็จ" + req.body.goodsname);
    console.log(req);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};
