import * as express from "express";
import { connect as mongoDbConnection} from 'mongoose';
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import Routes from "./routes";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

Routes.configure(app);

const start = async () => {
    await mongoDbConnection('mongodb://localhost:27017/test');

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}

start();