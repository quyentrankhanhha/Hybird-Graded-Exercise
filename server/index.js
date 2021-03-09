const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const moongose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const port = 4000;

// import routes
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");

dotenv.config();

// connect to db
moongose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected."))
  .catch((err) => console.log(err));

// middleware
app.use(express.json());

// routers
app.use("/login", loginRouter);
app.use("/register", registerRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
