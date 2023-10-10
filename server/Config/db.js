const mysql = require("mysql");

const connectDB = () => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
    port: "3306",
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to database:", err);
    } else {
      console.log("DB connected");
    }
  });

  

  return connection;
};

module.exports = connectDB;
