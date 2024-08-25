import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./router";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from auth service" });
});

//app.use("/api", protect, router)
app.use("/auth", router);

export default app;
