require("dotenv").config();
const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const expiresToken = "12h";
const jwt = require("jsonwebtoken");
const auth = require("./config/auth");
const logger = require("./config/logger");
const verifyToken = require("./config/auth");

var connection = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
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

/*router.post("/createAccountForKinderGarden", function (req, res, next) {
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
                console.log("DIREKTOR_OWNER:");
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
                );
              }
            );
          }
        );
      }
    );
  });
});*/

router.post("/createAccountForKinderGarden", async function (req, res, next) {
  try {
    connection.getConnection(async function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        return res.json(err);
      }
      req.body.kindergarden.password = await bcrypt.hash(
        req.body.kindergarden.password,
        10
      );
      req.body.kindergarden.email = req.body.kindergarden.email.toLowerCase();
      conn.query(
        "insert into kindergardens SET ?",
        req.body.kindergarden,
        async function (err, kindergarden) {
          req.body.owner.password = await bcrypt.hash(
            req.body.owner.password,
            10
          );
          req.body.owner.email = req.body.owner.email.toLowerCase();
          conn.query(
            "insert into owners SET ?",
            req.body.owner,
            async function (err, rows_owner) {
              req.body.director.password = await bcrypt.hash(
                req.body.director.password,
                10
              );
              req.body.director.email = req.body.director.email.toLowerCase();
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
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res, next) => {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      return res.json(err);
    }
    const email = req.body.email;
    conn.query(
      "SELECT o.id, k.id as kindergarden FROM owners o join directors d on o.id = d.owner_id join kindergardens k on d.id = k.director_id WHERE o.email=? AND o.password=?",
      [req.body.username, req.body.password],
      function (err, rows, fields) {
        if (err) {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        }
        if (rows.length > 0) {
          // dodaj unutar tokena da pored id-a user-a stoji i id vrtica kome dati user pripada
          const token = jwt.sign(
            {
              user: { id: rows[0].id, kindergarden: rows[0].kindergarden },
              email,
            },
            process.env.TOKEN_KEY,
            {
              expiresIn: expiresToken,
            }
          );
          return res.json({
            type: 1,
            user: rows,
            token: token,
          });
        } else {
          conn.query(
            "SELECT * FROM directors WHERE email=? AND password=?",
            [req.body.username, req.body.password],
            function (err, rows, fields) {
              if (err) {
                logger.log("error", err.sql + ". " + err.sqlMessage);
                res.json(err);
              }
              if (rows.length > 0) {
                const token = jwt.sign(
                  { user: { id: rows[0].id, kindergarden: 1 }, email },
                  process.env.TOKEN_KEY,
                  {
                    expiresIn: expiresToken,
                  }
                );
                return res.json({
                  type: 2,
                  user: rows,
                  token: token,
                });
              } else {
                res.json(false);
              }
            }
          );
        }
      }
    );
  });
});

/* KINDERGARDEN GROUP */

router.post("/createKindergardenGroup", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        // logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      console.log(req.body);
      req.body.kindergarden_id = req.user.user.kindergarden;
      console.log(req.body);
      conn.query(
        "insert into kindergarden_group SET ?",
        [req.body],
        function (err, rows) {
          console.log(rows);
          conn.release();
          if (!err) {
            /*logger.log(
              "info",
              `Add new kindergarden group. UserID: ${req.body.user_id.id}, KindergardenID: ${req.body.user_id.id}`
            );*/
            res.json(true);
          } else {
            logger.log(
              "error",
              `${err.sql}. ${err.sqlMessage}. UserID: ${req.body.user_id.id}, KindergardenID: ${req.body.user_id.id}`
            );
            res.json(false);
          }
        }
      );
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/updateKindergardenGroup", function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    conn.query(
      "update kindergarden_group SET ? where id = ?",
      [req.body, req.body.id],
      function (err, rows) {
        conn.release();
        if (!err) {
          if (!err) {
            res.json(true);
          } else {
            res.json(false);
          }
        } else {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        }
      }
    );
  });
});

router.get("/getKindergardenGroup", auth, async (req, res, next) => {
  try {
    console.log(req.user);
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from kindergarden_group where kindergarden_id = ?",
          [req.user.user.kindergarden],
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

router.get(
  "/getKindergardenGroupByKindergardenId",
  auth,
  async (req, res, next) => {
    try {
      console.log(req.user.user.kindergarden);
      connection.getConnection(function (err, conn) {
        if (err) {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        } else {
          conn.query(
            "select * from kindergarden_group where kindergarden_id = ?",
            [req.user.user.kindergarden],
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
  }
);

router.post("/deleteKindergardenGroup", (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        console.error("SQL Connection error: ", err);
        res.json({
          code: 100,
          status: err,
        });
      } else {
        conn.query(
          "delete from kindergarden_group where id = '" + req.body.id + "'",
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
});

/* KINDERGARDEN GROUP */

/* KINDERGARDEN SUBGROUP */

router.post("/createKindergardenSubgroup", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        // logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      console.log(req.body);
      req.body.kindergarden_id = req.user.user.kindergarden;
      console.log(req.body);
      conn.query(
        "insert into kindergarden_subgroup SET ?",
        [req.body],
        function (err, rows) {
          console.log(rows);
          conn.release();
          if (!err) {
            /*logger.log(
              "info",
              `Add new kindergarden group. UserID: ${req.body.user_id.id}, KindergardenID: ${req.body.user_id.id}`
            );*/
            res.json(true);
          } else {
            logger.log(
              "error",
              `${err.sql}. ${err.sqlMessage}. UserID: ${req.body.user_id.id}, KindergardenID: ${req.body.user_id.id}`
            );
            res.json(false);
          }
        }
      );
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/updateKindergardenSubgroup", function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    conn.query(
      "update kindergarden_subgroup SET ? where id = ?",
      [req.body, req.body.id],
      function (err, rows) {
        conn.release();
        if (!err) {
          if (!err) {
            res.json(true);
          } else {
            res.json(false);
          }
        } else {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        }
      }
    );
  });
});

router.get("/getKindergardenSubgroup", auth, async (req, res, next) => {
  try {
    console.log(req.user);
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select ksg.id, ksg.name, kg.name as kindergarden_group_name, kg.id as kindergarden_group_id from kindergarden_subgroup ksg join kindergarden_group kg on ksg.kindergarden_group_id = kg.id where ksg.kindergarden_id = ?",
          [req.user.user.kindergarden],
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

router.post("/deleteKindergardenSubgroup", (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        console.error("SQL Connection error: ", err);
        res.json({
          code: 100,
          status: err,
        });
      } else {
        conn.query(
          "delete from kindergarden_subgroup where id = '" + req.body.id + "'",
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
});

/* KINDERGARDEN SUBGROUP */

/* ALL CHILDRENS */

router.post("/createChildren", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        // logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      const father = {
        firstname: req.body.father_firstname,
        lastname: req.body.father_lastname,
        kindergarden_id: req.user.user.kindergarden,
      };
      const mother = {
        firstname: req.body.mother_firstname,
        lastname: req.body.mother_lastname,
        kindergarden_id: req.user.user.kindergarden,
      };
      conn.query(
        "insert into parents SET ?",
        [father],
        function (err, father_res) {
          console.log(father_res.insertId);
          if (!err) {
            /*logger.log(
              "info",
              `Add new kindergarden group. UserID: ${req.body.user_id.id}, KindergardenID: ${req.body.user_id.id}`
            );*/
            conn.query(
              "insert into parents SET ?",
              [mother],
              function (err, mother_res) {
                console.log(mother_res.insertId);
                if (!err) {
                  /*logger.log(
                    "info",
                    `Add new kindergarden group. UserID: ${req.body.user_id.id}, KindergardenID: ${req.body.user_id.id}`
                  );*/

                  const children = {
                    firstname: req.body.children_firstname,
                    lastname: req.body.children_lastname,
                    kindergarden_subgroup_id: req.body.kindergarden_subgroup_id,
                    kindergarden_id: req.user.user.kindergarden,
                    mother_id: mother_res.insertId,
                    father_id: father_res.insertId,
                    birthday: req.body.children_birthday,
                    gender: req.body.children_gender,
                  };
                  console.log(children);
                  conn.query(
                    "insert into childrens SET ?",
                    [children],
                    function (err, children_res) {
                      console.log(children_res);
                      conn.release();
                      if (!err) {
                        /*logger.log(
                          "info",
                          `Add new kindergarden group. UserID: ${req.body.user_id.id}, KindergardenID: ${req.body.user_id.id}`
                        );*/
                        res.json(true);
                      } else {
                        console.log(err);
                        /*logger.log(
                          "error",
                          `${err.sql}. ${err.sqlMessage}. UserID: ${req.body.user_id.id}, KindergardenID: ${req.body.user_id.id}`
                        );*/
                        res.json(false);
                      }
                    }
                  );
                } else {
                  console.log(err);
                  /*logger.log(
                    "error",
                    `${err.sql}. ${err.sqlMessage}. UserID: ${req.body.user_id.id}, KindergardenID: ${req.body.user_id.id}`
                  );*/
                  res.json(false);
                }
              }
            );
          } else {
            /*logger.log(
              "error",
              `${err.sql}. ${err.sqlMessage}. UserID: ${req.body.user_id.id}, KindergardenID: ${req.body.user_id.id}`
            );*/
            res.json(false);
          }
        }
      );
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/updateChildren", function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    conn.query(
      "update kindergarden_subgroup SET ? where id = ?",
      [req.body, req.body.id],
      function (err, rows) {
        conn.release();
        if (!err) {
          if (!err) {
            res.json(true);
          } else {
            res.json(false);
          }
        } else {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        }
      }
    );
  });
});

router.get("/getChildrens", auth, async (req, res, next) => {
  try {
    console.log(req.user);
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select c.id as children_id, c.firstname as children_firstname, c.lastname as children_lastname, c.birthday as children_birthday, c.gender as children_gender, p1.firstname as mother_firstname, p1.lastname as mother_lastname, p2.firstname as father_firstname, p2.lastname as father_lastname from childrens c join parents p1 on c.mother_id = p1.id join parents p2 on c.father_id = p2.id where c.kindergarden_id = ?",
          [req.user.user.kindergarden],
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

router.post("/deleteChildren", (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        console.error("SQL Connection error: ", err);
        res.json({
          code: 100,
          status: err,
        });
      } else {
        conn.query(
          "delete from kindergarden_subgroup where id = '" + req.body.id + "'",
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
});

/* ALL CHILDRENS END */

module.exports = router;
