import * as dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import http from 'http';
import { Server } from 'socket.io';



import { database } from './Database/connection.js';
import userRouter from './router/user.js';
import adminRouter from './router/admin.js';
import doctorRouter from './router/doctor.js'
import messageRouter from './router/message.js'
import conversationRouter from './router/conversation.js'



const PORT = process.env.PORT;
const app = express();



//database
database();

//middlewares
app.use(cors({ origin: true, credentials: true, origin: ["https://web-doc.jithinjoshi.live","https://admin.jithinjoshi.live"] }));
//app.use(cors({ origin: true, credentials: true, origin: ["http://localhost:3000","http://localhost:3001"] }));

app.use(express.json({ limit: '50mb' }));
app.use(morgan('tiny'));
app.use(cookieParser())

app.use(function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use(express.urlencoded({
    extended: true
}));

app.use(express.raw({ type: "application/json" }));

app.use(bodyParser.json());


app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/message', messageRouter);
app.use('/api/conversation',conversationRouter);




app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));

