const model = require("../model/users");
const express = require("express");
const app = express.Router(); /*almost axactly the same as the default we get from the express function, */

app
  .get("/", (req, res) => {
    //user response obj to send
    res.send(model.getAll());
  })

  /*make a locol variable id that points to the */
  .get("/:id", (req, res) => {
    const id = req.params.id;
    const user = model.get(
      +id
    ); /*find calls this function once for every item in items */
    res.send(user);
  })

  .patch("/:id", (req, res) => {
    const id = req.params.id;
    const user = model.update(+id, req.body);
    res.send(user);
  })

  .delete("/:id", (req, res) => {
    const id = req.params.id;
    const ret = model.remove(+id);
    res.send(ret);
  })

  module.exports = app;/*Common JS way of exporting */