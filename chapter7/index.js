const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const PORT = 3500;
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandle");
const corsOptions = require("./config/corsOptions");

app.use(logger);
// Cross origin resource sharing

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//serve static
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));

app.use("/register", require('./routes/api/register'));
app.use("/auth", require('./routes/api/auth'));
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
