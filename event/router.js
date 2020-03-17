const { Router } = require("express");
const Event = require("./model");
const Ticket = require("../ticket/model")
const auth = require("../auth/middleware");

const router = Router();

router.get("/events", async (request, response, next) => {
  Event.findAll()
    .then(event => response.json(event))
    .catch(next);
});

router.post("/events", auth, (request, response, next) => {
  const userId = request.user.id;

  const newEvent = {
    name: request.body.eventName,
    description: request.body.description,
    pictureUrl: request.body.pictureUrl,
    startingDate: request.body.startingDate,
    endDate: request.body.endDate,
    userId: userId
  };

  Event.create(newEvent)
    .then(event => response.json(event))
    .catch(next);
});

router.get("/events/:id", (request, response, next) => {
  console.log("req.params", request.params.id);
  Event.findByPk(request.params.id, {include: Ticket})
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
