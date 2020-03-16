const bcrypt = require("bcryptjs");
const { Router } = require("express");

const router = Router();
const User = require("./model");

router.post("/user", async (request, response, next) => {
  try {
    const encrypted = bcrypt.hashSync(request.body.password, 10);

    const user = {
      name: request.body.name,
      password: encrypted
    };
    console.log(request.body);

    const person = await User.create(user);
    response.send(person);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
