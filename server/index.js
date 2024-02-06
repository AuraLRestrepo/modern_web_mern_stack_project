import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
// import mongoose from 'mongoose';

import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';

//data imports
import User from './models/User.js';
import Products from './models/Products.js';
import ProductsStat from './models/ProductsStat.js';
import { dataUser, dataProductStat, dataProduct } from './data/index.js';

/**CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/** ROUTES */
app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);

/** MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
const URL_MONGO = process.env.URL_MONGO;

mongoose.connect(URL_MONGO).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // ONLY ADD DATA ONE TIME
    // Products.insertMany(dataProduct);
    // ProductsStat.insertMany(dataProductStat);
    // User.insertMany(dataUser);
}).catch((error) => console.log(error));

