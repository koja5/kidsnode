require("dotenv").config();
const express = require("express");
const router = express.Router();
const mongo = require("mongodb").MongoClient;
const url = process.env.MONGO;

router.post("/addMessage", function (req, res, next) {
  var item = {
    kindergarden: req.body.kindergarden,
    sender_id: req.body.sender_id,
    received_id: req.body.received_id,
    message: req.body.message,
  };

  mongo.connect(url, function (err, db) {
    if (err) throw err;
    console.log(err);
    var dbo = db.db("sample_airbnb");
    dbo.collection("messages").insert(req.body, function (err, result) {
      console.log("Item inserted!" + result);
      if (err) throw err;
      res.json(true);
    });
  });
});

router.get("/getMessagesForUser/:id", function (req, res, next) {
  const id = req.params.id;
  console.log(id);

  mongo.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("sample_airbnb");
    dbo
      .collection("messages")
      .find({
        $or: [
          { sender_id: Number(req.params.id) },
          { received_id: Number(req.params.id) },
        ],
      })
      .toArray(function (err, rows) {
        if (err) throw err;
        res.json(rows);
      });
  });
});

module.exports = router;
