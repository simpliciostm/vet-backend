import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import initRoutes from './routes/initRoutes';
import mongoose from 'mongoose';

class Server {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middlewares();
        this.routes();
        this.database();
    }

    private middlewares() {
        this.express.use(express.json());
        this.express.use(cors());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes() {
        this.express.use(initRoutes);
    }

    private database() {
        mongoose.connect(`${process.env.MONGO_URL}`)
            .then(() => {
                console.log('Server connect MongoDB');
            }).catch((err) => {
                console.log(`Erro ao se conectar com MongoDB`, err);
            })
    }
}

export default new Server().express;