
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";

import * as dotenv from 'dotenv'
dotenv.config()

const app = express();

app.use(express.json({ limit: '50mb', extended: true }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use("/user", userRouter);

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT|| 5000;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);