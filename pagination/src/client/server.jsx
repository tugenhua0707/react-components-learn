import express from 'express';
import http from 'http';
import path from 'path';
import React from 'react';
import consolidate from 'consolidate';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 7777

app.set('views', __dirname + './views');
app.engine('html', consolidate.mustache);
app.set('view engine', 'html');

app.get('/home', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../dist/client/views/home.html'));
});
if (process.env.NODE_ENV === undefined || process.env.NODE_ENV !== 'production') {
  var webpack = require('webpack');
  var config = require('../../webpack.config');
  var compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
  var reload = require('reload');
  reload(server, app);
  app.use('/static', express.static(path.join(__dirname, '../../dist/client/static')));
}

console.log(`Server is listening to port: ${port}`);
server.listen(port)