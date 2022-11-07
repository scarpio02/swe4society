const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
// THis is previous DB Connection

// const dbo = require("./db/conn");
 
// app.listen(port, () => {
//   // perform a database connection when server starts
//   dbo.connectToServer(function (err) {
//     if (err) console.error(err);
 
//   });
//   console.log(`Server is running on port: ${port}`);
// });

const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json();
// app.use(jsonParser);
// app.use(urlencodedParser);
const Db = process.env.ATLAS_URI;

mongoose.connect(Db, { useNewUrlParser:true, useUnifiedTopology:true })
.then((res) => {
  app.listen(process.env.PORT, () => console.log("Server is live"))
  })
.catch(err => console.log(err))


const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("./models/user");

app.post("/register", async (req, res) => {
  const user = req.body;

  console.log(req.body);
  // check if the username or email has been taken by another user already
  const takenUsername = await User.findOne({username: user.username})
  const takenEmail = await User.findOne({email: user.email})

  if (takenUsername || takenEmail) {
    res.json({message: "Username or email has already been taken"})
  } else {
    user.password = await bcrypt.hash(req.body.password, 10)

    const dbUser = new User({
      username: user.username.toLowerCase(),
      email: user.email.toLowerCase(),
      password: user.password
    })

    dbUser.save()
    res.json({message: "Success"})
  }
})

app.post("/login", (req, res) => {
    
  const userLoggingIn = req.body;

  User.findOne({username: userLoggingIn.username})
  .then(dbUser => {
    if (!dbUser) {
      return res.json({
        message: "Invalid Username or Password"
      })
    }
    bcrypt.compare(userLoggingIn.password, dbUser.password)
    .then(isCorrect => {
      if (isCorrect) {
        const payload = {
          id: dbUser._id,
          username: dbUser.username,
        }
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {expiresIn: 86400},
          (err, token) => {
            if (err) return res.json({message: err})
            return res.json({
              message: "Success",
              token: "Bearer " + token
            })
          }
        )
      } else {
        return res.json({
          message: "Invalid Username or Password"
        })
      }
    })
  })
})

function verifyJWT(req, res, next) {
  const token = req.headers["x-access-toke"]?.split(' ')[1]

  if (token) {
    jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
      if (err) return res.json({
        isLoggedIn: false,
        message: "Failed To Authenticate"
      })
      req.user = {};
      req.user.id = decoded.id
      req.user.username = decoded.username
      next()
    })
  } else {
    res.json({message: "Incorrect Token Given", isLoggedIn: false})
  }
}

app.get("/getUsername", verifyJWT, (req, res) => {
  res.json({isLoggedIn: true, username: req.user.username})
})