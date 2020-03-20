const { Router } = require("express");
const Event = require("./model");
const Ticket = require("../ticket/model");
const auth = require("../auth/middleware");

const router = Router();

router.get("/events", async (request, response, next) => {
  //   const limit = Math.min(request.query.limit || 9, 25)
  //   const offset = request.query.offset || 0
  //   Event.findAndCountAll({
  //     limit, offset
  //   })
  //     .then(result => response.send({events: result.rows, total: result.count}))
  //     .catch(error => next(error))
  // });
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

router.get("/events/:eventId", (request, response, next) => {
  Event.findByPk(request.params.eventId, { include: [Ticket] })
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
