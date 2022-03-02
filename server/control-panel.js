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
          "select count(*) as 'number', DATE_FORMAT(date, '%d.%M') as date from record_absense where kindergarden_id = ? group by date order by date asc",
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

router.get(
  "/getNumberOfChildrensInKindergarden",
  auth,
  async (req, res, next) => {
    try {
      connection.getConnection(function (err, conn) {
        if (err) {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        } else {
          conn.query(
            "select count(*) as 'number' from childrens where kindergarden_id = ?",
            [req.user.user.kindergarden],
            function (err, rows, fields) {
              conn.release();
              if (err) {
                res.json(err);
                logger.log("error", err.sql + ". " + err.sqlMessage);
              } else {
                res.json(rows[0]);
              }
            }
          );
        }
      });
    } catch (ex) {}
  }
);

router.get(
  "/getNumberOfEmployeesInKindergarden",
  auth,
  async (req, res, next) => {
    try {
      connection.getConnection(function (err, conn) {
        if (err) {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        } else {
          conn.query(
            "select count(*) as 'number' from employees where kindergarden_id = ?",
            [req.user.user.kindergarden],
            function (err, rows, fields) {
              conn.release();
              if (err) {
                res.json(err);
                logger.log("error", err.sql + ". " + err.sqlMessage);
              } else {
                res.json(rows[0]);
              }
            }
          );
        }
      });
    } catch (ex) {}
  }
);

router.get(
  "/getNumberOfChildrenActivityInKindergarden",
  auth,
  async (req, res, next) => {
    try {
      connection.getConnection(function (err, conn) {
        if (err) {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        } else {
          const date = new Date().toISOString();
          conn.query(
            "select count(*) as 'number' from calendar_of_children_activity where kindergarden_id = ? and StartTime > ?",
            [req.user.user.kindergarden, date],
            function (err, rows, fields) {
              conn.release();
              if (err) {
                res.json(err);
                logger.log("error", err.sql + ". " + err.sqlMessage);
              } else {
                res.json(rows[0]);
              }
            }
          );
        }
      });
    } catch (ex) {}
  }
);

router.get(
  "/getNumberOfSuppliersInKindergarden",
  auth,
  async (req, res, next) => {
    try {
      connection.getConnection(function (err, conn) {
        if (err) {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        } else {
          const date = new Date().toISOString();
          conn.query(
            "select count(*) as 'number' from suppliers_company where kindergarden_id = ?",
            [req.user.user.kindergarden],
            function (err, rows, fields) {
              conn.release();
              if (err) {
                res.json(err);
                logger.log("error", err.sql + ". " + err.sqlMessage);
              } else {
                res.json(rows[0]);
              }
            }
          );
        }
      });
    } catch (ex) {}
  }
);

router.get("/getRecordsOfArrivalByGroup", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        const date = new Date().toISOString().slice(0, 10);
        conn.query(
          "select count(c.id) as 'number', k.name as 'group' from record_absense r join childrens c on r.children_id = c.id join kindergarden_subgroup k on c.kindergarden_subgroup_id = k.id where k.kindergarden_id = ? and date = ? group by k.name",
          [req.user.user.kindergarden, date],
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
