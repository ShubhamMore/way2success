//Install express server
const express = require('express');
const path = require('path');

const port = process.env.PORT;

const http = require('http');
const app = express();

const server = http.createServer(app);

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/classManagement'));

app.get('/*', function(req, res) {
  const url = path.join(__dirname, 'dist', 'classManagement', 'index.html');
  res.sendFile(url);
});

// Start the app by listening on the default Heroku port
server.listen(port, () => {
  console.log('Server is listening on port ' + port);
});
