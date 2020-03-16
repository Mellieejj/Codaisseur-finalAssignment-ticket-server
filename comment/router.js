const { Router } = require("express");
const Comment = require("./model");

const router = Router();

router.post("/events/:id/:ticketId", (request, response, next) => {
  Comment.create(request.body)
    .then(event => response.json(event))
    .catch(next);
});


module.exports = router;
