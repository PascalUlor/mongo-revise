/**
 * Application Main file
 */
const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('../models');
const { NOT_FOUND } = require('../utils/error');
const { handleResponse, OK } = require('../utils/success');
const routes = require('../routes');

const app = express();

/**
  * Set up middleware
  */
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(cors());
app.use(logger('dev'));
app.use(helmet());

app.get('/', (req, res) => {
  res.status(OK).json(
    handleResponse({
      message: 'Welcome to API root',
      data: {
        department_url: {
          create_department: '/api/v1/department',
        },
      },
    }),
  );
});

app.use('/api/v1', routes);

// Handle invalid request
app.all('*', (req, res) => {
  res.status(NOT_FOUND).json({
    success: false,
    message: 'Invalid route!',
  });
});

module.exports = app;
