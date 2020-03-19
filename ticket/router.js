const { Router } = require("express");
const Ticket = require("./model");
const Comment = require("../comment/model");
const Event = require("../event/model");
const auth = require("../auth/middleware");

const router = Router();

router.get("/tickets", (request, response, next) => {
  Ticket.findAll()
    .then(ticket => response.json(ticket))
    .catch(next);
});

router.get("/tickets/:ticketId", (request, response, next) => {
  // console.log("req.params", request.params);
  Ticket.findByPk(request.params.ticketId, { include: [Comment] })
    .then(ticket => {
      if (!ticket) {
        response.status(404).end();
      } else {
        response.json(ticket);
      }
    })
    .catch(next);
});

router.post("/tickets", auth, async (request, response, next) => {
  try {
    const userId = request.user.id;

    const newTicket = {
      description: request.body.description,
      pictureUrl: request.body.pictureUrl,
      price: request.body.price,
      userId: userId,
      eventId: request.body.eventId
    };
    const ticket = await Ticket.create(newTicket);
    response.send(ticket);
  } catch (error) {
    next(error);
  }
});

router.put("/tickets/:ticketId", auth, (request, response, next) => {
  Ticket.findByPk(request.params.ticketId)
    .then(ticket => {
      if (ticket && request.user.id === ticket.userId) {
        if (request.body.description && request.body.price) {
          const updateTicket = {
            description: request.body.description,
            pictureUrl: request.body.pictureUrl,
            price: request.body.price,
            userId: request.user.id,
            eventId: request.body.eventId
          };
          return ticket
            .update(updateTicket)
            .then(ticket => response.status(200).json(ticket));
        }
      } else {
        return response.status(404).send("ticket does not exist or wrong user");
      }
    })
    .catch(next);
});

module.exports = router;
