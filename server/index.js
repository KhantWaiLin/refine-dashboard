import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';


import connectDB from './mongodb/connect.js';
import userRouter from './routes/user.routes.js';
import propertyRouter from './routes/property.routes.js';


const app = express();

//middleWare
dotenv.config();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/properties', propertyRouter);

app.get('/', (req, res) => {
    res.send({ message: "Hello World" });
});

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => {
            console.log("Server has started on port 8080");
        })
    } catch (error) {
        console.log(error);
    }
}

startServer();