const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn");
const authRoutes = require("./Router/AuthRoutes");
const cookieParser = require("cookie-parser");
const Profile = require("./Models/ProfileModel");
const Calender = require("./Models/CalenderModel");
const student = require("./Models/StudentModel");
const driver = require("./Models/DriverModel");

// app.use(cors({
//     origin: ["http://localhost:3000"] ,
//     method:["GET", "POST"],
//     Credentials:true
// }));
// app.use(cors());
app.use(cors({ origin: true, scredentials: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    return res.status(200).json({});
  }
  next();
});


app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);    

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/createProfile", async (req, res) => {
  let data = new Profile(req.body);
  let result = await data.save();
  console.log(req.body);
  res.send(result);
});

app.get("/profile", async (req, res) => {
  const myData = await Profile.find({});
  res.status(200).json( myData );
});

app.put("/updateProfile/:id", async (req,res) =>{
  console.log(req.params)
  let data = await Profile.updateOne(
    req.params,
    {
      $set: req.body
    }
  );
  res.send(data)
})

app.post("/schedule", async (req, res) => {
  let data = new Calender(req.body);
  let result = await data.save();
  console.log(req.body);
  res.send(result);
});

app.get("/schedule", async (req, res) => {
  const myData = await Calender.find({});
  res.status(200).json( myData );
});

app.post("/createStudent", async (req,res) =>{
  let data = new student(req.body);
  let result = await data.save();
  console.log(req.body);
  res.send(result);
})

// const user = new student({
//   name: req.body.name,
//   email: req.body.email,
//   phone: req.body.phone,
//   password: req.body.password
// });
// user.save()
//   .then(result => {
//     res.status(201).json({
//       message: 'User created!',
//       result: result
//     });
//   })
//   .catch(err => {
//     res.status(500).json({
//       error: err
//     });
//   });

app.post("/student", async (req, res) => {
  student.findOne({ email: req.body.email, password: req.body.password })
  .then(user => {
    if (!user) {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    res.status(200).json({
      message: 'Auth successful',
      user: user
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: 'Auth failed',
      error: err
    });
  });
});

app.post("/createDriver", async (req,res) =>{
  let data = new driver(req.body);
  let result = await data.save();
  console.log(req.body);
  res.send(result);
})

app.post("/driver", async (req, res) => {
  driver.findOne({ email: req.body.email, password: req.body.password })
  .then(user => {
    if (!user) {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    res.status(200).json({
      message: 'Auth successful',
      user: user
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: 'Auth failed',
      error: err
    });
  });
});




app.listen(2000, () => {
  console.log("Server is running on port 8000");
});

