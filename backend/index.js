require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");

// Connect DB
connectDB();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use(
  cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"],
    credentials: true, 
  })
);

// authentication routes
app.use("/event", require("./routes/event.routes"));
app.use("/user", require("./routes/user.routes"));

const PORT = 4000;

const server = app.listen(PORT, () =>
  console.log(`Server is listening on port ${PORT}`)
);

process.on("unhandledRejections", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
