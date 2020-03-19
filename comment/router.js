const { Router } = require("express");
const Comment = require("./model");
const auth = require("../auth/middleware");

const router = Router();

router.post("/comments", auth, (request, response, next) => {
  const userId = request.user.id;

  const newComment = {
    text: request.body.text,
    userId: userId,
    ticketId: request.body.ticketId
  };
  console.log(newComment);

  Comment.create(newComment)
    .then(comment => response.json(comment))
    .catch(next);
});

router.get("/comments", (request, response, next) => {
  Comment.findAll()
    .then(comments => response.json(comments))
    .catch(next);
});
module.exports = router;
