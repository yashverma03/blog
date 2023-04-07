import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongodbConnection from './database/mongodbConnection.js';
import router from './routes/route.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

mongodbConnection();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running successfully on PORT ${PORT}`);
});
