const express = require("express");
const cors = require("cors");
const userRouter = require("./user/router");
const authRouter = require("./auth/router");
const eventRouter = require("./event/router");

const app = express();

const corsMiddleware = cors();
app.use(corsMiddleware);

const bodyParser = express.json();
app.use(bodyParser);

app.use(authRouter);
app.use(userRouter);
app.use(eventRouter);

const port = 4000;

app.listen(port, () => {
  console.log(`app listen on ${port}`);
});
