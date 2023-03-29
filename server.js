import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";

import connectDB from "./config/db.js";
import editorsRouter from "./routes/editorsRoutes.js";
import articlesRouter from "./routes/articlesRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();
app.use(cors());

// Body parser middleware
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to good news api - news about cooperations and initiatives between Israelis and Palestinians",
  });
});

app.use("/api/v1/news/editors", editorsRouter);
app.use("/api/v1/news/articles", articlesRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
