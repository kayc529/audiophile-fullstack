require('dotenv').config();
require('express-async-errors');

import express from 'express';
import path from 'path';
const app = express();

// //custom middleware
import notFoundMiddleware from './middleware/not-found';
import errorHandlerMiddleware from './middleware/error-handler';

//router
import authRouter from './routers/authRoutes';
import userRouter from './routers/userRoutes';
import productRouter from './routers/productRoutes';
import orderRouter from './routers/orderRoutes';
import cartRouter from './routers/cartRoutes';

// //db
import connectDB from './db/connect';

// //packages
import cookieParser from 'cookie-parser';
import rateLimiter from 'express-rate-limit';
import helmet from 'helmet';
import xss from 'xss-clean';
// //cors
const cors = require('cors');
const corsOptions = {
  origin: true,
  credentials: true,
};
const mongoSanitize = require('express-mongo-sanitize');

// //middleware
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: true,
  })
);
app.use(helmet());
app.use(cors(corsOptions));
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(express.static('./public'));
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cookieParser(process.env.JWT_SECRET));

//routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/cart', cartRouter);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

//not found
app.use(notFoundMiddleware);
//error handler
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.DB_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
