const { Router } = require("express");
const { toJWT } = require("./jwt");
const bcrypt = require("bcryptjs");
const User = require("../user/model");
const auth = require("./middleware");

const router = Router();

router.post("/login", (request, response, next) => {
  const { name, password } = request.body;

  if (name && password) {
    User.findOne({
      where: {
        name: name
      }
    })
      .then(entity => {
        if (!entity) {
          response.status(400).send({
            message: "User with that name does not exist"
          });
        } else if (bcrypt.compareSync(password, entity.password)) {
          response.send({
            jwt: toJWT({ userId: entity.id })
          });
        } else {
          response.status(400).send({
            message: "Password was incorrect"
          });
        }
      })
      .catch(error => {
        console.error(error);
        response.status(500).send({
          message: "Something went wrong"
        });
      });
  } else {
    response.status(400).send({
      message: "Please fill in a valid name & password"
    });
  }
});

router.get("/secret-endpoint", auth, (request, response, next) => {
  response.send({
    message: `Thanks for visting the secret endpoint ${request.user.email}. `
  });
});

module.exports = router;
