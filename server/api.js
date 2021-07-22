const express = require("express");
const router = express.Router();
const mysql = require("mysql");

/*var connection = mysql.createPool({
  host: "185.178.193.141",
  user: "appproduction.",
  password: "jBa9$6v7",
  database: "kidsnode",
});*/

var connection = mysql.createPool({
  host: "116.203.85.82",
  user: "appprodu_appproduction",
  password: "CJr4eUqWg33tT97mxPFx",
  database: "appproduction_kidsnode"
});

connection.getConnection(function (err, conn) {
  console.log(conn);
});

/* GET api listing. */
router.get("/", (req, res) => {
  res.send("api works");
});

router.post("/createAccountForKinderGarden", function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      // logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    conn.query(
      "insert into kindergardens SET ?",
      req.body.kindergarden,
      function (err, rows) {
        conn.query(
          "insert into owners SET ?",
          req.body.owner,
          function (err, rows) {
            conn.query(
              "insert into directors SET",
              req.body.director,
              function (err, rows) {
                conn.release();
                if (!err) {
                  res.json(true);
                } else {
                  // logger.log("error", err.sql + ". " + err.sqlMessage);
                  res.json(err);
                }
              }
            );
          }
        );
      }
    );
  });
});

module.exports = router;
