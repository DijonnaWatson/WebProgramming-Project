const model = require("../model/users.js");
const express = require("express");
const app = express.Router();

app
  .get("/", (req, res, next) => {
    model
      .getAll()
      .then((x) => res.send(x))
      .catch(next);
  })
  .get("/:id", (req, res, next) => {
    const id = req.params.id;
    model
      .get(+id)
      .then((x) => res.send(x))
      .catch(next);
  })
  .post("/", (req, res, next) => {
    model
      .add(req.body)
      .then((x) => res.send(x))
      .catch(next);
  })
  .patch("/:id", (req, res, next) => {
    const id = req.params.id;
    model
      .update(+id, req.body)
      .then((x) => res.send(x))
      .catch(next);
  })
  .delete("/:id", (req, res, next) => {
    const id = req.params.id;
    model
      .remove(+id)
      .then((x) => res.send(x))
      .catch(next);
  })
  .post("/seed", (req, res, next) => {
    model
      .seed()
      .then((x) => res.send(x))
      .catch(next);
  })
  .post("/:id/activityLogs", (req, res, next) => {
    const id = req.params.id;
    model
      .addActivityLog(+id, req.body)
      .then((x) => res.send(x))
      .catch(next);
  })
  .delete("/:id/activityLogs", (req, res, next) => {
    const id = req.params.id;
    model
      .removeActivityLog(+id, req.body)
      .then((x) => res.send(x))
      .catch(next);
  })
  .patch("/:id/activityLogs", (req, res, next) => {
    const id = req.params.id;
    model
      .updateActivityLog(+id, req.body)
      .then((x) => res.send(x))
      .catch(next);
  });

  

module.exports = app;
