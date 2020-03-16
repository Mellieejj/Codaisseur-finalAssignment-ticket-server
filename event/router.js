const { Router } = require("express");
const Event = require("./model");

const router = Router();

router.get("/events", async (request, response, next) => {
  Event.findAll()
    .then(event => response.json(event))
    .catch(next);
});

router.post("/events", (request, response, next) => {
  Event.create(request.body)
    .then(event => response.json(event))
    .catch(next);
});

router.get("/events/:id", (request, response, next) => {
  Event.findByPk(request.params.id)
    .then(event => {
      if (!event) {
        response.status(404).end();
      } else {
        response.json(event);
      }
    })
    .catch(next);
});

module.exports = router;
