import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config'

class Server {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middlewares();
    }

    private middlewares() {
        this.express.use(express.json());
        this.express.use(cors());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
}

export default new Server().express;