const connectDB = require("../Config/db");
const connection = connectDB();

exports.read = async (req, res) => {
  try {
    const id = req.params.id;
    connection.query(
      "SELECT * FROM supplier WHERE supid = ?",
      [id],
      (queryErr, results) => {
        if (queryErr) {
          console.error("Error executing query:", queryErr);
          res.status(500).json({ error: "Error executing query" });
          return;
        }
        if (results[0] == undefined) {
          return res.sendStatus(404)
        }
        res.status(200).json(results);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

exports.list = async (req, res) => {
  try {
    connection.query("SELECT * FROM supplier", (queryErr, results) => {
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
    const { supid, fname, lname, tel, email } = req.body;

    let sql =
      "INSERT INTO supplier(supid, fname, lname, tel, email) VALUES(?,?,?,?,?)";
    connection.query(
      sql,
      [supid, fname, lname, tel, email],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        return res.status(201).send();
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

exports.update = async (req, res) => {
  try {
    res.send("hello update");
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};

exports.remove = async (req, res) => {
  try {
    res.send("hello delete");
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};
