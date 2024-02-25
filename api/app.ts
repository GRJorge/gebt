import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import './config/db';

import userRouter from './routes/user';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/user', userRouter);

app.listen(process.env.PORT, () => {
    console.log(`Listen on ${process.env.PORT}`);
});
