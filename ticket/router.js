const {Router} = require("express")
const Ticket = require("./model")
const Event = require("../event/model")

const router = Router()

router.get("/tickets", (request, response, next) {
  Ticket.findAll({include: Event})
  .then(ticket => response.json(ticket))
  .catch(next)
})

router.post("/tickets", (request, response, next) {
  
})