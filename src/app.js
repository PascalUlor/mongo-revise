const http = require('http');
const app = require('./api/server');

const port = process.env.PORT || 2021;

// Start application
const httpServer = http.createServer(app);

httpServer.listen(port, (err) => {
  if (err) console.log(err.message);
  console.log(`Application started on http://localhost:${port}`);
});
