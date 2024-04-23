import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import './config/db';

import userRouter from './routes/user';
import patientRouter from './routes/patient';
import appointmentRouter from './routes/appointment';
import appointmentDataRouter from './routes/appointmentData';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/user', userRouter);
app.use('/patient', patientRouter);
app.use('/appointment', appointmentRouter);
app.use('/appointmenData', appointmentDataRouter);

app.listen(process.env.PORT, () => {
    console.log(`Listen on ${process.env.PORT}`);
});
