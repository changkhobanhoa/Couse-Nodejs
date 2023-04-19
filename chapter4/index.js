const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const PORT = 3500;
const {  logger } = require("./middleware/logEvents");
const errorHandler=require('./middleware/errorHandle')
// app.get('/',(req,res)=>{
//   res.send('Hello World!')
// });

app.use(logger);
// Cross origin resource sharing
const whitelist = [
  "https://www.trancongtien.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 ||!origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by Cors"));
    }
  },
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//serve static
app.use(express.static(path.join(__dirname, "/public")));

app.get("^/$|index(.html)?", (req, res) => {
  // res.sendFile('./views/index.html',{root:__dirname})
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new.html"));
});
app.get("/old.html", (req, res) => {
  res.redirect(301, "/new.html");
});
// route handler
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attemp to load hello.html");
    next();
  },
  (req, res) => {
    res.send("hello world");
  }
);
// chaining route handlers
const one = (req, res, next) => {
  console.log("one");
  next();
};
const two = (req, res, next) => {
  console.log("two");
  next();
};
const three = (req, res, next) => {
  console.log("three");
  res.send("finished");
};
app.get("/chain(.html)?", [one, two, three]);

app.all("*", (req, res) => {
  res.status(404)
  if(req.accepts('.html')){
    res.sendFile(path.join(__dirname, "views", "404.html"));

  } else
  if(req.accepts('json')){
    res.json({error:"404 Not found"})
  } else{
    res.type('txt').send('404 not found')
  }
});
 app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Serve running on http://localhost:${PORT}`);
});
