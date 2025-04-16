import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGI || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/User.routes.js";
import VideoRouter from "./routes/Video.routes.js";
import ImageRouter from "./routes/image.routes.js";
import Watchlist from "./routes/watchlist.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", VideoRouter);
app.use("/api/v1/images", ImageRouter);
app.use("/api/v1/watchlist", Watchlist);

export default app;
