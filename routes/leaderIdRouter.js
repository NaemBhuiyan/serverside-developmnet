const express = require("express");
const bodyParser = require("body-parser");

const leaderIdRouter = express.Router();

leaderIdRouter.use(bodyParser.json());

leaderIdRouter
  .route("/:leaderId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end(
      "Will send details of the leaders: " + req.params.leaderId + " to you!"
    );
  })

  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /leaders/" + req.params.leaderId);
  })

  .put((req, res, next) => {
    res.write("Updating the leaders: " + req.params.leaderId + "\n");
    res.end(
      "Will update the leaders: " +
        req.body.name +
        " with details: " +
        req.body.description
    );
  })

  .delete((req, res, next) => {
    res.end("Deleting leaders: " + req.params.leaderId);
  });

module.exports = leaderIdRouter;
