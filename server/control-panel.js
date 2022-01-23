require("dotenv").config();
const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const auth = require("./config/auth");
const logger = require("./config/logger");

var connection = mysql.createPool({
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

connection.getConnection(function (err, conn) {
  console.log(err);
  console.log(conn);
});

/* GET api listing. */
router.get("/", (req, res) => {
  res.send("api works");
});

router.get("/getChildrensStatistic", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select count(*) as 'number', c.kindergarden_subgroup_id from childrens c join parents p1 on c.mother_id = p1.id join parents p2 on c.father_id = p2.id join kindergarden_subgroup ks on c.kindergarden_subgroup_id = ks.id where c.kindergarden_id = ? group by c.kindergarden_subgroup_id",
          [req.user.user.kindergarden],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              res.json(err);
              logger.log("error", err.sql + ". " + err.sqlMessage);
            } else {
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {}
});

module.exports = router;
