const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const PORT = 3500;
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandle");
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
    if (whitelist.indexOf(origin) !== -1 || !origin) {
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
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/employees", require("./routes/api/employee"));
 
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts(".html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Serve running on http://localhost:${PORT}`);
});
