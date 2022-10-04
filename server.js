import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
// connect to db
import mongoClient from "./src/config/db.js";
dotenv.config();

const app = express();

const port = process.env.PORT || 8000;

mongoClient();

// app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// load routes
import adminRouter from "./src/routers/admin.router.js";
import loginRouter from "./src/routers/login.router.js";

// user routes
app.use("/api/v1/admin-user", adminRouter);
app.use("/api/v1/login", loginRouter);

app.use("/", (req, res, next) => {
  res.json("ok");
});

// global error handler
app.use((error, req, res, next) => {
  console.log(error.message);
  res.status(error.status || 500);
  res.json({
    status: "error",
    message: error.message,
  });
});

console.log("checkin' on the server...");

app.listen(port, (error) => {
  if (error) console.log(error);
  console.log(`server is ready at http://localhost:${port}`);
});
