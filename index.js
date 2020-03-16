const express = require("express");
const cors = require("cors");
const User = require("./user/model")
const app = express();

const corsMiddleware = cors();
app.use(corsMiddleware);

const bodyParser = express.json();
app.use(bodyParser);

const port = 4000;

app.listen(port, () => {
  console.log(`app listen on ${port}`);
});
