import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import router from './router/main';
import config from './config/main';

const app = express();
mongoose.connect(config.db);

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(cors());

router(app);

let server;
if (config.port) {
    server = app.listen(config.port);
    console.log(`App listening on ${config.port}`);
}

export default server;