const mongoose = require('mongoose');

const { mongoURI, dbName } = require('../config/keys');

// TODO: connect to schemas
const departmentSchema = require('./department');

mongoose.model('Department', departmentSchema);

// TODO: set up db connection
const dbConnection = (mongoUri, databaseName) => {
  const mongooseOpts = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: databaseName,
  };

  mongoose.connect(mongoUri, mongooseOpts);

  mongoose.connection.on('error', (e) => {
    if (e.message.code === 'ETIMEDOUT') {
      console.log(e);
      mongoose.connect(mongoUri, mongooseOpts);
    }
    console.log(e);
  });

  mongoose.connection.once('open', () => {
    console.log('MongoDB successfully connected');
  });
};

dbConnection(mongoURI, dbName);
