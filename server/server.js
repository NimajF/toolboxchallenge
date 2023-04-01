import express from "express";
import cors from "cors";

import router from "./router/route.js";

const app = express();
app.use(express.json());
app.use(cors({ credentials: true }));
app.disable("x-powered-by");

const port = 8080;

app.get("/", (req, res) => {
  res.status(201).json("HOME GET");
});

app.use("/api", router);

try {
  app.listen(port, () => {
    console.log("Connected!!! Port:", port);
  });
} catch (err) {
  console.log("Connection Error");
}

export default app;
