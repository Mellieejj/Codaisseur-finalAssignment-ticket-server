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

router.put("/tickets/:ticketId", auth, async (request, response, next) => {
  try {
    const updateReqUser = request.user.id;

    console.log("update request", request.user.id);

    const oldTicket = await Ticket.findByPk(request.params.ticketId);

    const updateTicket = {
      description: request.body.description || oldTicket.description,
      pictureUrl: request.body.pictureUrl || oldTicket.pictureUrl,
      price: request.body.price || oldTicket.price,
      userId: oldTicket.userId,
      eventId: request.body.eventId
    };
    console.log("oldTicket user", oldTicket.userId);

    if (oldTicket.userId === updateReqUser) {
      const ticket = await oldTicket.update(updateTicket);
      response.send(ticket);
    }
    // else {
    //   return response.status(400).send({
    //     message: "Not allowed to change!"
    //   })
    // }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
