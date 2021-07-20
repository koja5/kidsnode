const express = require("express");
const router = express.Router();
const mysql = require("mysql");

var connection = mysql.createPool({
    host: "185.178.193.141",
    user: "appproduction.",
    password: "jBa9$6v7",
    database: "kidsnode",
  });

connection.getConnection(function (err, conn) {
    console.log(conn);
});

/* GET api listing. */
router.get("/", (req, res) => {
  res.send("api works");
});

router.get("/test", (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        res.json(err);
      } else {
        conn.query("select * from test", function (err, rows, fields) {
          conn.release();
          if (err) {
            res.json(err);
          } else {
            console.log(rows);
            res.json(rows);
          }
        });
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

module.exports = router;
