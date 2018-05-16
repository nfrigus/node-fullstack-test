const http = require('http');
const config = require('config').api;
const app = require('./app');


const server = http.createServer(app);


server.listen(config.port, config.host, () => {
  console.log(`Server listen on ${config.host}:${config.port}`);
});
