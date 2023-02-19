import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import Connection from "./database/db.js";
import Router from "./routes/route.js";
// import path from "path";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);

// Static files
// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "../client/build")));
// app.get("*", (request, response) => {
//   response.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("../client/build"));
// }

const PORT = process.env.PORT || 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);

app.listen(PORT, () => {
  console.log(`Server is running successfully on PORT ${PORT}`);
});
