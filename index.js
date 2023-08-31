const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();

// import routes
const route = require('./routes/index');

const app = express();
const password = `${process.env.PASS_MONGODB}`;
const encodedPassword = encodeURIComponent(password);
const url = `mongodb+srv://${process.env.USER_MONGODB}:${encodedPassword}@cluster0.1cqjyzp.mongodb.net/inventoris?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to db")
}).catch((err) => {
  console.log("error", err)
})

app.use(cors({
  origin: ["http://inflow.my.id"],
  methods: ["POST", "GET", "DELETE", "PATCH", "PUT"],
  credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized:false,
  cookie: {
      secure:false,
      maxAge: 1000 * 60 * 60 * 24
  }
}))
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use(route);

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
});
