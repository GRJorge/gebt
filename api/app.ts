import express, { json, urlencoded } from 'express';
import session from 'express-session';
import MongoDBStoreModule from 'connect-mongodb-session';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import './config/db';

import userRouter from './routes/user';

const app = express();

const mongoDBStore = MongoDBStoreModule(session);
const store = new mongoDBStore({
    uri: process.env.DB_URL!,
    collection: 'sessions',
});

store.on('error', (error) => {
    console.log(error);
});

app.use(
    session({
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
        store,
        cookie: {
            secure: false,
            maxAge: 1 * 24 * 60 * 60 * 1000,
        },
    })
);

declare module 'express-session' {
    interface SessionData {
        user: string;
    }
}

app.use(cors());
app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/user', userRouter);

app.listen(process.env.PORT, () => {
    console.log(`Listen on ${process.env.PORT}`);
});
