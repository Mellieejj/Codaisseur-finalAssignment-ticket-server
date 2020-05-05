const bcrypt = require("bcryptjs");
const { Router } = require("express");

const router = Router();
const User = require("./model");

router.post("/users", async (request, response, next) => {
  try {
    const password = request.body.password;
    if (!request.body.name || !password) {
      return response
        .status(400)
        .send({ message: "Please supply a valid username and password" });
    } else if (password.length < 8) {
      return response
        .status(400)
        .send({ message: "Password should be at least 8 karakters" });
    } else {
      const user = {
        name: request.body.name,
        password: bcrypt.hashSync(request.body.password, 10),
      };
      const person = await User.create(user);
      response.status(200).send(person);
    }
  } catch (error) {
    response.status(400).send({
      message: "This username is already in use",
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
