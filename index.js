import express from "express";
import { Router } from "express";

import router from "./Router.js";
import cors from "cors";

const app = express();
const PORT = 8181;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send({ message: "Hello" });
});

app.use("/upload", router);
app.listen(PORT, () => {
  console.log("Server started running on:", PORT);
});
