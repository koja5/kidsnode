require("dotenv").config();
const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const expiresToken = "12h";
const jwt = require("jsonwebtoken");
const auth = require("./config/auth");
const logger = require("./config/logger");
const verifyToken = require("./config/auth");
const bodyParser = require("body-parser");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart({ uploadDir: "./server/file_uploads" });
const path = require("path");

var connection = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

connection.getConnection(function (err, conn) {});

/* GET api listing. */
router.get("/", (req, res) => {
  res.send("upload works");
});

router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.post("/save", multipartMiddleware, (req, res) => {
  console.log(req);
  res.json({
    message: "File uploaded successfully",
  });
});

router.post("/saveChildrenDocuments", multipartMiddleware, (req, res) => {
  try {
    console.log(req);
    connection.getConnection(function (err, conn) {
      if (err) {
        console.error("SQL Connection error: ", err);
        res.json({
          code: 100,
          status: err,
        });
      } else {
        const document = {
          children_id: 1,
          name: req.files.UploadFiles.name,
          type: req.files.UploadFiles.type,
          path: req.files.UploadFiles.path,
        };
        conn.query(
          "insert into children_documents set ?",
          [document],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              res.json(false);
              logger.log("error", err.sql + ". " + err.sqlMessage);
            } else {
              res.json(true);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
  res.json({
    message: "File uploaded successfully",
  });
});

router.get("/getChildrenDocuments/:id", auth, async (req, res, next) => {
  try {
    console.log(req.user);
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from children_documents where children_id = ?",
          [req.params.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              res.json(err);
              logger.log("error", err.sql + ". " + err.sqlMessage);
            } else {
              // logger.log("info", "Test");
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/getDocument", async (req, res, next) => {
  console.log(req);
  req.body.path = req.body.path.toString().replace("server\\", "");
  filepath = path.join(__dirname, req.body.path)
  res.sendFile(filepath, {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachement; filename="test.pdf"`,
    },
  });
});

module.exports = router;
