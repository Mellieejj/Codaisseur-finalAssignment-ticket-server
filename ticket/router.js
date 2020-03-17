const { Router } = require("express");
const Ticket = require("./model");
const Event = require("../event/model");
const auth = require("../auth/middleware");

const router = Router();

router.get("/tickets", (request, response, next) => {
  Ticket.findAll({ include: Event })
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

module.exports = router;
