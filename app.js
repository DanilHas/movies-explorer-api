require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, MONGO_DB, NODE_ENV } = require('./config');
const { limiter } = require('./middlewares/rate-limiter');

mongoose.connect(
  NODE_ENV === 'production' ? MONGO_DB : 'mongodb://127.0.0.1:27017/bitfilmsdb',
);

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ['https://movie-explorer.nomoredomainsrocks.ru', 'http://localhost:3000'],
  }),
);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.use(limiter);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(NODE_ENV === 'production' ? PORT : 3000, () => {
  console.log(`App listening on port ${PORT}`);
});
