const { Router } = require("express");
const Ticket = require("./model");
const Event = require("../event/model");
const auth = require("../auth/middleware");

const router = Router();

router.get("/tickets", (request, response, next) => {
  Ticket.findAll()
    .then(ticket => response.json(ticket))
    .catch(next);
});

router.post("/tickets", auth, (request, response, next) => {
  const userId = request.user.id;

  const newTicket = {
    description: request.body.description,
    pictureUrl: request.body.pictureUrl,
    price: request.body.price,
    userId: userId,
    eventId: request.body.eventId
  };

  Ticket.create(newTicket)
    .then(ticket => response.json(ticket))
    .catch(next);
});

router.get("/tickets/:ticketId", (request, response, next) => {
  console.log("req.params", request.params);
  Ticket.findByPk(request.params.ticketId)
    .then(ticket => {
      if (!ticket) {
        response.status(404).end();
      } else {
        response.json(ticket);
      }
    })
    .catch(next);
});

module.exports = router;
