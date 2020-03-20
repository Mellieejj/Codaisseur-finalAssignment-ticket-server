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
      response.status(200).send(person);
    }
  } catch (error) {
    response.status(400).send({
      message: "This username is already in use"
    });
  }
});

router.get("/users", async (request, response, next) => {
  try {
    const person = await User.findAll();
    response.status(200).send(person);
  } catch (error) {
    console.error;
  }
});
module.exports = router;
