const bcrypt = require("bcryptjs");
const { Router } = require("express");

const router = Router();
const User = require("./model");

router.post("/users", async (request, response, next) => {
  try {
    if (!request.body.name || !request.body.password) {
      return response
        .status(400)
        .send({ message: "Please Supply a valid name and password" });
    } else {
      const user = {
        name: request.body.name,
        password: bcrypt.hashSync(request.body.password, 10)
      };
      const person = await User.create(user);
      response.json(person);
    }
  } catch (error) {
    response.status(400).send({
      message: "This username is already in user"
    });
  }
});

module.exports = router;
