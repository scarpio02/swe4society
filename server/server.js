const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("./models/user");
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(require("./routes/record"));

// get driver connection
// This is previous DB Connection


const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json();
const Db = process.env.ATLAS_URI;

app.post("/isUserAuth", verifyJWT, (req, res) => {
  //authenticate user
  console.log("user auth is working");
  return res.json({isLoggedIn: true, username: req.user.username})
})

mongoose.connect(Db, { useNewUrlParser:true, useUnifiedTopology:true })
.then((res) => {
  app.listen(process.env.PORT, () => console.log("Server is live"))
  })
.catch(err => console.log(err))

app.post("/register", async (req, res) => {
  const user = req.body;
  console.log(req.body);

  // check if the username or email has been taken by another user already
  const takenUsername = await User.findOne({username: user.username})

  //display message if username has been taken
  if (takenUsername) {
    res.json({message: "Username or email has already been taken"})
  } else {
    console.log("password is: ", req.body.password);
    user.password = await bcrypt.hash(req.body.password.toString(), 10)
    //creates new user login
    const dbUser = new User({
      username: user.username.toString().toLowerCase(),
      password: user.password.toString()
    })
    //save the user login in the database
    dbUser.save()
    res.json({message: "Success"})
  }
})

app.post("/login", (req, res) => {
    
  const userLoggingIn = req.body;

  if (!userLoggingIn) return res.json({message: "Server Error"})

  const username = userLoggingIn.username.toString();
  const password = userLoggingIn.password.toString();
    
    //check user input to see if the provided username and password exist in the database
    User.findOne({username: userLoggingIn.username.toLowerCase()})
    .then(dbUser => {
      if (!dbUser) {
        return res.json({
          message: "Invalid Username or Password"
        })
      }
     //if the username and password are correct, log the user in
      bcrypt.compare(userLoggingIn.password, dbUser.password)
      .then(isCorrect => {
        if (isCorrect) {
          const payload = {
            id: dbUser._id,
            username: dbUser.username,
          }
          //login is successful
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: 86400},
            (err, token) => {
              return res.json({
                message: "Success",
                token: "Bearer " + token
              })
            }
          )
        } else {
          return res.json({
           //login was not successful
            message: "Invalid Username or Password"
          })
        }
      })
    })
  }
)

function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"]?.split(' ')[1]

  if (token) {
    console.log("Token");
    

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      console.log(err);
      if (err) {
        //error occurs during authentication, show message
        console.log("if err is working");
        return res.json({
        isLoggedIn: false,
        message: "Failed To Authenticate"
      })
    }
      req.user = {};
      req.user.id = decoded.id
      req.user.username = decoded.username
      next()
    })
  } else {
    //message if token is not valid 
    res.json({message: "Incorrect Token Given", isLoggedIn: false})
  }
}

//gets username
app.get("/getUsername", verifyJWT, (req, res) => {
  res.json({isLoggedIn: true, username: req.user.username})
})
