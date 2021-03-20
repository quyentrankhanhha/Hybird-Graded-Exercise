const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const moongose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 4000;

// import routes
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const itemsRouter = require("./routes/items");

dotenv.config();

// connect to db
moongose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB Connected."))
  .catch((err) => console.log(err));

// middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello");
});

// routers
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/items", itemsRouter);

const User = require("./models/User");
app.get("/user", async function(req, res) {
  const user = await User.find();
  res.json(user);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
