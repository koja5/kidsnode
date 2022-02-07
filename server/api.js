require("dotenv").config();
const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const expiresToken = "12h";
const jwt = require("jsonwebtoken");
const auth = require("./config/auth");
const logger = require("./config/logger");
const request = require("request");
const fs = require("fs");

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

/*router.post("/createAccountForKinderGarden", function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
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
                      logger.log("error", err.sql + ". " + err.sqlMessage);
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
                      logger.log("error", err.sql + ". " + err.sqlMessage);
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
  } catch (err) {}
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
          // treba ovde spakovati i tip user-a(uzmi iz enum-a)
          const token = jwt.sign(
            {
              user: {
                id: rows[0].id,
                kindergarden: rows[0].kindergarden,
                type: process.env.owner,
              },
              email,
            },
            process.env.TOKEN_KEY,
            {
              expiresIn: expiresToken,
            }
          );
          logger.log(
            "info",
            `UserID: ${
              req.body.username
            } is LOGIN at ${new Date().toDateString()}.`
          );
          return res.json({
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
                logger.log(
                  "info",
                  `UserID: ${req.body.username} is LOGIN at ${new Date()}.`
                );
                return res.json({
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
    var body = JSON.parse(
      fs.readFileSync("./server/mail_server/config.json", "utf-8")
    );
    body.activate_mail.fields["link"] = process.env.link_client;
    var options = {
      url: process.env.link_api + "mail-server/sendMail",
      method: "POST",
      body: body.activate_mail,
      json: true,
    };
    request(options, function (error, response, body) {});
  });
});

/* KINDERGARDEN GROUP */

router.post("/createKindergardenGroup", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      req.body.kindergarden_id = req.user.user.kindergarden;
      conn.query(
        "insert into kindergarden_group SET ?",
        [req.body],
        function (err, rows) {
          conn.release();
          if (!err) {
            res.json(true);
          } else {
            logger.log("error", `${err.sql}. ${err.sqlMessage}`);
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
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
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
                logger.log("error", err.sql + ". " + err.sqlMessage);
                res.json(err);
              } else {
                logger.log(
                  "info",
                  `Get kindergarden group by kindergarden id: ${req.user.user.kindergarden}`
                );
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
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(false);
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
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      req.body.kindergarden_id = req.user.user.kindergarden;
      conn.query(
        "insert into kindergarden_subgroup SET ?",
        [req.body],
        function (err, rows) {
          conn.release();
          if (!err) {
            res.json(true);
          } else {
            logger.log("error", `${err.sql}. ${err.sqlMessage}.`);
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
          res.json(true);
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
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
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
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(false);
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
        logger.log("error", err.sql + ". " + err.sqlMessage);
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
          if (!err) {
            conn.query(
              "insert into parents SET ?",
              [mother],
              function (err, mother_res) {
                if (!err) {
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
                  conn.query(
                    "insert into childrens SET ?",
                    [children],
                    function (err, children_res) {
                      conn.release();
                      if (!err) {
                        res.json(true);
                      } else {
                        logger.log("error", `${err.sql}. ${err.sqlMessage}.`);
                        res.json(false);
                      }
                    }
                  );
                } else {
                  logger.log("error", `${err.sql}. ${err.sqlMessage}.`);
                  res.json(false);
                }
              }
            );
          } else {
            logger.log("error", `${err.sql}. ${err.sqlMessage}.`);
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
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select c.id as children_id, c.firstname as children_firstname, c.lastname as children_lastname, c.birthday as children_birthday, c.gender as children_gender, p1.firstname as mother_firstname, p1.lastname as mother_lastname, p2.firstname as father_firstname, p2.lastname as father_lastname, ks.id as kindergarden_subgroup_id from childrens c join parents p1 on c.mother_id = p1.id join parents p2 on c.father_id = p2.id join kindergarden_subgroup ks on c.kindergarden_subgroup_id = ks.id where c.kindergarden_id = ?",
          [req.user.user.kindergarden],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
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

router.get("/getChildrenById/:id", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from childrens where id = ?",
          [req.params.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              if (rows.length === 1) {
                res.json(rows[0]);
              } else {
                res.json(rows);
              }
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

router.get("/getChildrenParentsById/:id", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select p1.firstname as mother_firstname, p1.lastname as mother_lastname, p2.firstname as father_firstname, p2.lastname as father_lastname from childrens c join parents p1 on c.mother_id = p1.id join parents p2 on c.father_id = p2.id where c.id = ?",
          [req.params.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              if (rows.length === 1) {
                res.json(rows[0]);
              } else {
                res.json(rows);
              }
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
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(false);
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

/* CHILDREN NOTES */

router.get(
  "/getAllChildrenNotesByChildrenId/:id",
  auth,
  async (req, res, next) => {
    try {
      connection.getConnection(function (err, conn) {
        if (err) {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        } else {
          conn.query(
            "select * from children_notes where children_id = ?",
            [req.params.id],
            function (err, rows, fields) {
              conn.release();
              if (err) {
                logger.log("error", err.sql + ". " + err.sqlMessage);
                res.json(err);
              } else {
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

router.post("/createChildrenNotes", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      req.body.children_id = req.body.id;
      req.body.educator_id = req.user.user.id;
      delete req.body.id;

      conn.query(
        "insert into children_notes SET ?",
        [req.body],
        function (err, rows) {
          conn.release();
          if (!err) {
            res.json(true);
          } else {
            logger.log("error", `${err.sql}. ${err.sqlMessage}.`);
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

router.post("/updateChildrenNotes", function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    conn.query(
      "update children_notes SET ? where id = ?",
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

router.post("/deleteChildrenNotes", (req, res, next) => {
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
          "delete from children_notes where id = '" + req.body.id + "'",
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(false);
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

/* CHILDREN NOTES END */

/* CHILDREN TAKING */

router.get(
  "/getAllChildrenTakingByChildrenId/:id",
  auth,
  async (req, res, next) => {
    try {
      connection.getConnection(function (err, conn) {
        if (err) {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        } else {
          conn.query(
            "select * from children_taking where children_id = ?",
            [req.params.id],
            function (err, rows, fields) {
              conn.release();
              if (err) {
                logger.log("error", err.sql + ". " + err.sqlMessage);
                res.json(err);
              } else {
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

router.post("/createChildrenTaking", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      req.body.creation_date = new Date().toDateString();
      req.body.children_id = req.body.id;
      req.body.educator_id = req.user.user.id;
      delete req.body.id;

      conn.query(
        "insert into children_taking SET ?",
        [req.body],
        function (err, rows) {
          conn.release();
          if (!err) {
            res.json(true);
          } else {
            logger.log("error", `${err.sql}. ${err.sqlMessage}.`);
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

router.post("/updateChildrenTaking", function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    conn.query(
      "update children_taking SET ? where id = ?",
      [req.body, req.body.id],
      function (err, rows) {
        conn.release();
        if (!err) {
          res.json(true);
        } else {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        }
      }
    );
  });
});

router.post("/deleteChildrenTaking", (req, res, next) => {
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
          "delete from children_taking where id = '" + req.body.id + "'",
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(false);
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

/* CHILDREN TAKING END */

/* KINDERGARDEN EMPLOYEE */

router.post("/createEmployee", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      console.log(req.body);
      req.body.kindergarden_id = req.user.user.kindergarden;
      conn.query(
        "insert into employees SET ?",
        [req.body],
        function (err, rows) {
          conn.release();
          if (!err) {
            var body = JSON.parse(
              fs.readFileSync("./server/mail_server/config.json", "utf-8")
            );
            body.new_account.fields["email"] = req.body.email;
            body.new_account.fields["password"] = "Test";
            body.new_account.fields["link"] = process.env.link_client;
            console.log(body);
            var options = {
              url: process.env.link_api + "mail-server/sendMail",
              method: "POST",
              body: body.new_account,
              json: true,
            };
            request(options, function (error, response, body) {});
            res.json(true);
          } else {
            logger.log("error", err.sql + ". " + err.sqlMessage);
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

router.post("/updateEmployee", function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    conn.query(
      "update employees SET ? where id = ?",
      [req.body, req.body.id],
      function (err, rows) {
        conn.release();
        if (!err) {
          res.json(true);
        } else {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        }
      }
    );
  });
});

router.get("/getEmployees", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select e.*, k.name as kindergarden_subgroup_name, t.name as user_type_name from employees e join kindergarden_subgroup k on e.kindergarden_subgroup_id = k.id join type_of_user t on e.user_type_id = t.id where e.kindergarden_id = ?",
          [req.user.user.kindergarden],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
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

router.post("/deleteEmployee", (req, res, next) => {
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
          "delete from employees where id = '" + req.body.id + "'",
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(false);
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

router.get("/getUserOfType", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query("select * from type_of_user", function (err, rows, fields) {
          conn.release();
          if (err) {
            logger.log("error", err.sql + ". " + err.sqlMessage);
            res.json(err);
          } else {
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

router.get("/getEmployeeById/:id", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from employees where id = ?",
          [req.params.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              if (rows.length === 1) {
                res.json(rows[0]);
              } else {
                res.json(rows);
              }
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

/* KINDERGARDEN WorkPlace END */

/* PARAMETERS WORK PLACE */

router.post("/createWorkPlace", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      req.body.kindergarden_id = req.user.user.kindergarden;
      conn.query(
        "insert into work_places SET ?",
        [req.body],
        function (err, rows) {
          conn.release();
          if (!err) {
            res.json(true);
          } else {
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

router.post("/updateWorkPlace", function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    conn.query(
      "update work_places SET ? where id = ?",
      [req.body, req.body.id],
      function (err, rows) {
        conn.release();
        if (!err) {
          res.json(true);
        } else {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        }
      }
    );
  });
});

router.get("/getWorkPlaces", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from work_places where kindergarden_id = ?",
          [req.user.user.kindergarden],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
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

router.post("/deleteWorkPlace", (req, res, next) => {
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
          "delete from work_places where id = '" + req.body.id + "'",
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(false);
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

/* PARAMETERS EMPLOYEE END */

/* PARAMETERS TYPEOFWORK */

router.post("/createTypeOfWork", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      req.body.kindergarden_id = req.user.user.kindergarden;
      conn.query(
        "insert into type_of_work SET ?",
        [req.body],
        function (err, rows) {
          conn.release();
          if (!err) {
            res.json(true);
          } else {
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

router.post("/updateTypeOfWork", function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    conn.query(
      "update type_of_work SET ? where id = ?",
      [req.body, req.body.id],
      function (err, rows) {
        conn.release();
        if (!err) {
          res.json(true);
        } else {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        }
      }
    );
  });
});

router.get("/getTypeOfWorks", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from type_of_work where kindergarden_id = ?",
          [req.user.user.kindergarden],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
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

router.post("/deleteTypeOfWork", (req, res, next) => {
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
          "delete from type_of_work where id = '" + req.body.id + "'",
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(false);
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

/* PARAMETERS TYPEOFWORK END */

/* PARAMETERS FOOD */

router.post("/createFood", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      req.body.kindergarden_id = req.user.user.kindergarden;
      conn.query("insert into foods SET ?", [req.body], function (err, rows) {
        conn.release();
        if (!err) {
          res.json(true);
        } else {
          res.json(false);
        }
      });
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/updateFood", function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    conn.query(
      "update foods SET ? where id = ?",
      [req.body, req.body.id],
      function (err, rows) {
        conn.release();
        if (!err) {
          res.json(true);
        } else {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        }
      }
    );
  });
});

router.get("/getFoods", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from foods where kindergarden_id = ?",
          [req.user.user.kindergarden],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
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

router.post("/deleteFood", (req, res, next) => {
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
          "delete from foods where id = '" + req.body.id + "'",
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(false);
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

/* PARAMETERS FOOD END */

/* TYPE OF MEAL */

router.get("/getTypeOfMeal", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query("select * from type_of_meal", function (err, rows, fields) {
          conn.release();
          if (err) {
            logger.log("error", err.sql + ". " + err.sqlMessage);
            res.json(err);
          } else {
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

/* END TYPE OF MEAL */

/* FOOD MENU */

router.post("/createFoodMenu", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      req.body.kindergarden_id = req.user.user.kindergarden;
      const data = {
        kindergarden_id: req.user.user.kindergarden,
        type_of_meal_id: req.body.type_of_meal_id,
        type_of_food: req.body.type_of_food.toString(),
        StartTime: new Date(req.body.StartTime),
        EndTime: new Date(req.body.EndTime),
      };
      conn.query("insert into food_menu SET ?", [data], function (err, rows) {
        conn.release();
        if (!err) {
          res.json(true);
        } else {
          res.json(false);
        }
      });
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/updateFoodMenu", function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    const data = {
      id: req.body.id,
      kindergarden_id: req.body.kindergarden_id,
      type_of_meal_id: req.body.type_of_meal_id,
      type_of_food: req.body.type_of_food.toString(),
      StartTime: new Date(req.body.StartTime),
      EndTime: new Date(req.body.EndTime),
    };

    conn.query(
      "update food_menu SET ? where id = ?",
      [data, req.body.id],
      function (err, rows) {
        conn.release();
        if (!err) {
          res.json(true);
        } else {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        }
      }
    );
  });
});

router.get("/getFoodMenu", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from food_menu where kindergarden_id = ?",
          [req.user.user.kindergarden],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
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

router.post("/deleteFoodMenu", (req, res, next) => {
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
          "delete from food_menu where id = '" + req.body.id + "'",
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(false);
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

/* END FOOD MENU */

/* RECORD ABSENSE */

// MULTI SELECT
router.post("/recordAbsense", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      const date = new Date().toLocaleDateString("en-US");
      var arrayOfValue = "";

      for (var i = 0; i < req.body.length; i++) {
        arrayOfValue = "(" + req.body[i] + "," + "'" + date + "'" + ")";
        if (i === req.body.length - 1) {
          arrayOfValue += ";";
        } else {
          arrayOfValue += ",";
        }
      }
      conn.query(
        "insert into record_absense(children_id, date) VALUES " + arrayOfValue,
        function (err, rows) {
          conn.release();
          if (!err) {
            res.json(true);
          } else {
            logger.log("error", err.sql + ". " + err.sqlMessage);
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

//SINGLE SELECT
router.post("/recordAbsenseSingle", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      const date = new Date();
      req.body.date = date;
      req.body.kindergarden_id = req.user.user.kindergarden;
      conn.query(
        "insert into record_absense SET ?",
        [req.body],
        function (err, rows) {
          conn.release();
          if (!err) {
            res.json(true);
          } else {
            logger.log("error", err.sql + ". " + err.sqlMessage);
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

router.post("/deleteRecordAbsenseSingle", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      const date = new Date().toISOString().slice(0, 10);
      req.body.date = date;
      conn.query(
        "delete from record_absense where children_id = ? and date = ?",
        [req.body.children_id, date],
        function (err, rows) {
          conn.release();
          if (!err) {
            res.json(true);
          } else {
            logger.log("error", err.sql + ". " + err.sqlMessage);
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

router.get("/getChildrenEvidentedAbsense", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        const date = new Date().toISOString().slice(0, 10);
        conn.query(
          "select * from record_absense r where date = ?",
          [date],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
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

router.get("/getChildrensAndAbsense", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        const date = new Date().toLocaleDateString("en-US");
        conn.query(
          "select * from childrens c where c.kindergarden_id = ?",
          [req.user.user.kindergarden],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err);
              res.json(err);
            } else {
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

/* END RECORD ABSENSE */

/* CALENDAR OF CHILDREN ACTIVITY */

router.post(
  "/createCalendarOfChildrenActivity",
  auth,
  function (req, res, next) {
    try {
      connection.getConnection(function (err, conn) {
        if (err) {
          res.json(err);
        }
        const data = {
          kindergarden_id: req.user.user.kindergarden,
          creator_id: req.user.user.id,
          title_of_activity: req.body.title_of_activity,
          description_of_activity: req.body.description_of_activity,
          Subject: req.body.Subject,
          IsAllDay: req.body.IsAllDay,
          StartTime: new Date(req.body.StartTime),
          EndTime: new Date(req.body.EndTime),
        };
        conn.query(
          "insert into calendar_of_children_activity SET ?",
          [data],
          function (err, rows) {
            conn.release();
            if (!err) {
              res.json(true);
            } else {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(false);
            }
          }
        );
      });
    } catch (ex) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(ex);
    }
  }
);

router.post(
  "/updateCalendarOfChildrenActivity",
  auth,
  function (req, res, next) {
    try {
      connection.getConnection(function (err, conn) {
        const data = {
          kindergarden_id: req.user.user.kindergarden,
          creator_id: req.user.user.id,
          title_of_activity: req.body.title_of_activity,
          description_of_activity: req.body.description_of_activity,
          Subject: req.body.Subject,
          IsAllDay: req.body.IsAllDay,
          StartTime: new Date(req.body.StartTime),
          EndTime: new Date(req.body.EndTime),
        };

        conn.query(
          "update calendar_of_children_activity SET ? where id = ?",
          [data, req.body.id],
          function (err, rows) {
            conn.release();
            if (!err) {
              res.json(true);
            } else {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(false);
            }
          }
        );
      });
    } catch (ex) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(ex);
    }
  }
);

router.get("/getCalendarOfChildrenActivity", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from calendar_of_children_activity where kindergarden_id = ?",
          [req.user.user.kindergarden],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
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

router.post("/deleteCalendarOfChildrenActivity", (req, res, next) => {
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
          "delete from calendar_of_children_activity where id = ?",
          [req.body.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(false);
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

/* END CALENDAR OF CHILDREN ACTIVITY */

/* WORK STRUCTURE EMPLOYEE */

router.get("/getWorkStructureEmployee", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from work_structure_employee",
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
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

/* END WORK STRUCTURE EMPLOYEE */

/* CALENDAR OF CHILDREN ACTIVITY */

router.post("/createWorkDiaryEmployee", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        res.json(err);
      }
      const data = {
        kindergarden_id: req.user.user.kindergarden,
        creator_id: req.user.user.id,
        work_structure: req.body.work_structure,
        work_description: req.body.work_description,
        Subject: req.body.Subject,
        StartTime: new Date(req.body.StartTime),
        EndTime: new Date(req.body.EndTime),
      };
      conn.query(
        "insert into work_diary_employee SET ?",
        [data],
        function (err, rows) {
          conn.release();
          if (!err) {
            res.json(true);
          } else {
            logger.log("error", err.sql + ". " + err.sqlMessage);
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

router.post("/updateWorkDiaryEmployee", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      const data = {
        kindergarden_id: req.user.user.kindergarden,
        creator_id: req.user.user.id,
        work_structure: req.body.work_structure,
        work_description: req.body.work_description,
        Subject: req.body.Subject,
        StartTime: new Date(req.body.StartTime),
        EndTime: new Date(req.body.EndTime),
      };

      conn.query(
        "update work_diary_employee SET ? where id = ?",
        [data, req.body.id],
        function (err, rows) {
          conn.release();
          if (!err) {
            res.json(true);
          } else {
            logger.log("error", err.sql + ". " + err.sqlMessage);
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

router.get("/getWorkDiaryEmployee", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from work_diary_employee where kindergarden_id = ?",
          [req.user.user.kindergarden],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
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

router.get("/getWorkDiaryEmployeeById/:id", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from work_diary_employee where kindergarden_id = ? and creator_id = ?",
          [req.user.user.kindergarden, req.params.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
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

router.post("/deleteWorkDiaryEmployee", (req, res, next) => {
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
          "delete from work_diary_employee where id = ?",
          [req.body.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(false);
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

/* END CALENDAR OF CHILDREN ACTIVITY */

/* HEALTH RECORD FOR CHILDREN */

router.post("/createChildrenHealthRecord", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        res.json(err);
      }

      req.body.children_id = req.body.id;
      req.body.creator_id = req.user.user.id;
      req.body.kindergarden_id = req.user.user.kindergarden;
      req.body.start_absense = new Date(req.body.start_absense);
      req.body.end_absense = new Date(req.body.end_absense);

      conn.query(
        "insert into children_health_records SET ?",
        [req.body],
        function (err, rows) {
          conn.release();
          if (!err) {
            res.json(true);
          } else {
            logger.log("error", err.sql + ". " + err.sqlMessage);
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

router.post("/updateChildrenHealthRecord", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      req.body.children_id = req.body.id;
      req.body.creator_id = req.user.user.id;
      req.body.kindergarden_id = req.user.user.kindergarden;
      req.body.start_absense = new Date(req.body.start_absense);
      req.body.end_absense = new Date(req.body.end_absense);

      conn.query(
        "update children_health_records SET ? where id = ?",
        [req.body, req.body.id],
        function (err, rows) {
          conn.release();
          if (!err) {
            res.json(true);
          } else {
            logger.log("error", err.sql + ". " + err.sqlMessage);
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

router.get("/getChildrenHealthRecord/:id", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from children_health_records where children_id = ?",
          [req.params.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
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

router.post("/deleteChildrenHealthRecord", (req, res, next) => {
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
          "delete from children_health_records where id = ?",
          [req.body.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(false);
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

/* END HEALTH RECORD FOR CHILDREN */

/* SUPPLIERS COMPANY */

router.post("/createSupplierCompany", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      req.body.kindergarden_id = req.user.user.kindergarden;
      conn.query(
        "insert into suppliers_company SET ?",
        [req.body],
        function (err, rows) {
          conn.release();
          if (!err) {
            res.json(true);
          } else {
            logger.log("error", `${err.sql}. ${err.sqlMessage}.`);
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

router.post("/updateSupplierCompany", function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    conn.query(
      "update suppliers_company SET ? where id = ?",
      [req.body, req.body.id],
      function (err, rows) {
        conn.release();
        if (!err) {
          res.json(true);
        } else {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        }
      }
    );
  });
});

router.get("/getSuppliersCompany", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from suppliers_company where kindergarden_id = ?",
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
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/deleteSupplierCompany", (req, res, next) => {
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
          "delete from suppliers_company where id = '" + req.body.id + "'",
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(false);
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

/* END SUPPLIERS COMPANY */

/* CHILDREN MEDICAL RECORDS CONTROL REVIEW */

router.get(
  "/getMedicalRecordControlReviews/:id",
  auth,
  async (req, res, next) => {
    try {
      connection.getConnection(function (err, conn) {
        if (err) {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        } else {
          conn.query(
            "select * from medical_record_control_reviews where children_id = ?",
            [req.params.id],
            function (err, rows, fields) {
              conn.release();
              if (err) {
                logger.log("error", err.sql + ". " + err.sqlMessage);
                res.json(err);
              } else {
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

router.post(
  "/createMedicalRecordControlReview",
  auth,
  function (req, res, next) {
    try {
      connection.getConnection(function (err, conn) {
        if (err) {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        }
        req.body.children_id = req.body.id;
        req.body.date_control = new Date(req.body.date_control);
        delete req.body.id;

        conn.query(
          "insert into medical_record_control_reviews SET ?",
          [req.body],
          function (err, rows) {
            conn.release();
            if (!err) {
              res.json(true);
            } else {
              logger.log("error", `${err.sql}. ${err.sqlMessage}.`);
              res.json(false);
            }
          }
        );
      });
    } catch (ex) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(ex);
    }
  }
);

router.post("/updateMedicalRecordControlReview", function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    req.body.date_control = new Date(req.body.date_control);

    conn.query(
      "update medical_record_control_reviews SET ? where id = ?",
      [req.body, req.body.id],
      function (err, rows) {
        conn.release();
        if (!err) {
          res.json(true);
        } else {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        }
      }
    );
  });
});

router.post("/deleteMedicalRecordControlReview", (req, res, next) => {
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
          "delete from medical_record_control_reviews where id = '" +
            req.body.id +
            "'",
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(false);
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

/* CHILDREN MEDICAL RECORDS CONTROL REVIEW */

/* CHILDREN MEDICAL RECORDS CONTROL OTHER REVIEW */

router.get(
  "/getMedicalRecordControlOtherReviews/:id",
  auth,
  async (req, res, next) => {
    try {
      connection.getConnection(function (err, conn) {
        if (err) {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        } else {
          conn.query(
            "select * from medical_record_control_other_reviews where children_id = ?",
            [req.params.id],
            function (err, rows, fields) {
              conn.release();
              if (err) {
                logger.log("error", err.sql + ". " + err.sqlMessage);
                res.json(err);
              } else {
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

router.post(
  "/createMedicalRecordControlOtherReview",
  auth,
  function (req, res, next) {
    try {
      connection.getConnection(function (err, conn) {
        if (err) {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        }
        req.body.children_id = req.body.id;
        req.body.date_control = new Date(req.body.date_control);
        delete req.body.id;

        conn.query(
          "insert into medical_record_control_other_reviews SET ?",
          [req.body],
          function (err, rows) {
            conn.release();
            if (!err) {
              res.json(true);
            } else {
              logger.log("error", `${err.sql}. ${err.sqlMessage}.`);
              res.json(false);
            }
          }
        );
      });
    } catch (ex) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(ex);
    }
  }
);

router.post(
  "/updateMedicalRecordControlOtherReview",
  function (req, res, next) {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }

      req.body.date_control = new Date(req.body.date_control);

      conn.query(
        "update medical_record_control_other_reviews SET ? where id = ?",
        [req.body, req.body.id],
        function (err, rows) {
          conn.release();
          if (!err) {
            res.json(true);
          } else {
            logger.log("error", err.sql + ". " + err.sqlMessage);
            res.json(err);
          }
        }
      );
    });
  }
);

router.post("/deleteMedicalRecordControlOtherReview", (req, res, next) => {
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
          "delete from medical_record_control_other_reviews where id = '" +
            req.body.id +
            "'",
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(false);
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

/* CHILDREN MEDICAL RECORDS CONTROL OTHER REVIEW */

/* CHILDREN MEDICAL RECORDS SPECIAL REVIEW */

router.get(
  "/getMedicalRecordSpecialReviews/:id",
  auth,
  async (req, res, next) => {
    try {
      connection.getConnection(function (err, conn) {
        if (err) {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        } else {
          conn.query(
            "select * from medical_record_special_reviews where children_id = ?",
            [req.params.id],
            function (err, rows, fields) {
              conn.release();
              if (err) {
                logger.log("error", err.sql + ". " + err.sqlMessage);
                res.json(err);
              } else {
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

router.post(
  "/createMedicalRecordSpecialReview",
  auth,
  function (req, res, next) {
    try {
      connection.getConnection(function (err, conn) {
        if (err) {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        }
        req.body.children_id = req.body.id;
        req.body.date_control = new Date(req.body.date_control);
        delete req.body.id;

        conn.query(
          "insert into medical_record_special_reviews SET ?",
          [req.body],
          function (err, rows) {
            conn.release();
            if (!err) {
              res.json(true);
            } else {
              logger.log("error", `${err.sql}. ${err.sqlMessage}.`);
              res.json(false);
            }
          }
        );
      });
    } catch (ex) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(ex);
    }
  }
);

router.post("/updateMedicalRecordSpecialReview", function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    req.body.date_control = new Date(req.body.date_control);

    conn.query(
      "update medical_record_special_reviews SET ? where id = ?",
      [req.body, req.body.id],
      function (err, rows) {
        conn.release();
        if (!err) {
          res.json(true);
        } else {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        }
      }
    );
  });
});

router.post("/deleteMedicalRecordSpecialReview", (req, res, next) => {
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
          "delete from medical_record_special_reviews where id = '" +
            req.body.id +
            "'",
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(false);
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

/* CHILDREN MEDICAL RECORDS SPECIAL REVIEW */

/* CHILDREN MEDICAL RECORDS OBSERVATIONS */

router.get(
  "/getMedicalRecordObservations/:id",
  auth,
  async (req, res, next) => {
    try {
      connection.getConnection(function (err, conn) {
        if (err) {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        } else {
          conn.query(
            "select * from medical_record_observations where children_id = ?",
            [req.params.id],
            function (err, rows, fields) {
              conn.release();
              if (err) {
                logger.log("error", err.sql + ". " + err.sqlMessage);
                res.json(err);
              } else {
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

router.post("/createMedicalRecordObservation", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      req.body.children_id = req.body.id;
      delete req.body.id;

      conn.query(
        "insert into medical_record_observations SET ?",
        [req.body],
        function (err, rows) {
          conn.release();
          if (!err) {
            res.json(true);
          } else {
            logger.log("error", `${err.sql}. ${err.sqlMessage}.`);
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

router.post("/updateMedicalRecordObservation", function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    conn.query(
      "update medical_record_observations SET ? where id = ?",
      [req.body, req.body.id],
      function (err, rows) {
        conn.release();
        if (!err) {
          res.json(true);
        } else {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        }
      }
    );
  });
});

router.post("/deleteMedicalRecordObservation", (req, res, next) => {
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
          "delete from medical_record_observations where id = '" +
            req.body.id +
            "'",
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

/* CHILDREN MEDICAL RECORDS OBSERVATIONS END */

/* KINDERGARDEN GENERAL INFO */

router.get("/getKindergardenGeneralInfo", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from kindergarden_general_info where kindergarden_id = ?",
          [req.user.user.kindergarden],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
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

router.post("/updateKindergardenGeneralInfo", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      conn.query(
        "select * from kindergarden_general_info where kindergarden_id = ?",
        [req.user.user.kindergarden],
        function (err, rows, fields) {
          console.log(rows);
          if (rows.length === 0) {
            req.body.kindergarden_id = req.user.user.kindergarden;
            delete req.body.id;

            conn.query(
              "insert into kindergarden_general_info SET ?",
              [req.body],
              function (err, rows) {
                conn.release();
                if (!err) {
                  res.json(true);
                } else {
                  logger.log("error", `${err.sql}. ${err.sqlMessage}.`);
                  res.json(false);
                }
              }
            );
          } else {
            conn.query(
              "update kindergarden_general_info SET ? where id = ?",
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
          }
        }
      );
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

/* KINDERGARDEN GENERAL INFO END */

module.exports = router;
