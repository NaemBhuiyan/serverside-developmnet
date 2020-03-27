const express = require("express"),
  http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const promoRouter = require("./routes/promoRouter");
const promoIdRouter = require("./routes/promoIdRouter");
const dishIdRouter = require("./routes/dishIdRouter");
const leaderRouter = require("./routes/leaderRouter");
const leaderIdRouter = require("./routes/leaderIdRouter");
const hostname = "localhost";
const port = 3000;

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/promotions", promoRouter);
app.use("/promotions", promoIdRouter);
app.use("/dishes", dishIdRouter);
app.use("/leaders", leaderRouter);
app.use("/leaders", leaderIdRouter);
app.use(express.static(__dirname + "/public"));

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
