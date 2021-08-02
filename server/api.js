const express = require("express");
const router = express.Router();
const mysql = require("mysql");

var connection = mysql.createPool({
  host: "185.178.193.141",
  user: "appproduction.",
  password: "jBa9$6v7",
  database: "kidsnode",
});

/*var connection = mysql.createPool({
  host: "116.203.85.82",
  user: "appproduction_kids",
  password: "Iva#$2019Iva#$",
  database: "appproduction_kidsnode",
});*/

connection.getConnection(function (err, conn) {});

/* GET api listing. */
router.get("/", (req, res) => {
  res.send("api works");
});

router.post("/createAccountForKinderGarden", function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      // logger.log("error", err.sql + ". " + err.sqlMessage);
      return res.json(err);
    }
    conn.query(
      "insert into kindergardens SET ?",
      req.body.kindergarden,
      function (err, kindergarden) {
        conn.query(
          "insert into owners SET ?",
          req.body.owner,
          function (err, rows_owner) {
            conn.query(
              "insert into directors SET ?",
              req.body.director,
              function (err, rows_director) {
                console.log(err);
                if (err) return res.json(false);
                return res.json(true);
                /*console.log("DIREKTOR_OWNER:");
                console.log(rows_director);
                console.log(rows_owner);
                const owner_director = {
                  director_id: rows_director.insertId,
                  owner_id: rows_owner.insertId,
                };
                conn.query(
                  "insert into owner_director SET",
                  owner_director,
                  function (err, director) {
                    conn.release();
                    if (!err) {
                      res.json(true);
                    } else {
                      // logger.log("error", err.sql + ". " + err.sqlMessage);
                      res.json(err);
                    }
                  }
                );*/
              }
            );
          }
        );
      }
    );
  });
});

router.post("/login", function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      // logger.log("error", err.sql + ". " + err.sqlMessage);
      return res.json(err);
    }
    console.log(req.body);
    conn.query(
      "SELECT * FROM owners WHERE email=? AND password=?",
      [req.body.username, req.body.password],
      function (err, rows, fields) {
        if (err) {
          // logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        }
        console.log(rows);
        if (rows.length > 0) {
          return res.json({
            type: 1,
            user: rows,
          });
        } else {
          conn.query(
            "SELECT * FROM directors WHERE email=? AND password=?",
            [req.body.username, req.body.password],
            function (err, rows, fields) {
              if (err) {
                // logger.log("error", err.sql + ". " + err.sqlMessage);
                res.json(err);
              }
              if (rows.length > 0) {
                return res.json({
                  type: 2,
                  user: rows
                });
              }
            }
          );
        }
      }
    );
  });
});

module.exports = router;
