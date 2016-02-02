import http from 'http';
import express from 'express';
import socketio from 'socket.io';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import db from './db';
import middleware from './middleware';
import api from './api';
import Institution from './models/Institution';

var app = express();
app.server = http.createServer(app);
var io = socketio(app.server);
// 3rd party middleware
app.use(cors({
	exposedHeaders: ['Link']
}));

app.use(bodyParser.json({
	limit : '100kb'
}));

app.use(morgan('dev'));

// connect to db
db( λ => {

	// internal middleware
	app.use(middleware());

	// api router
	app.use('/api', api());


  var institutionsSocket = io.of('/sockets/institutions');
  institutionsSocket.on('connection', socket => {
    console.log('Connected to Institutions socket');
    // socket.emit('doc-change', 'blahbahfadsadsfasdfasdf');
  });

  Institution.changes().then( feed => {
    feed.each( (error, doc) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Institution changed");
        console.log(JSON.stringify(doc, null, 2));
        if(doc.getOldValue() == null) {
          console.log('/n/nEmitted doc');
          institutionsSocket.emit('doc-change', JSON.stringify(doc, null, 2));
        }
      }
    });
  });

	app.server.listen(process.env.PORT || 8080);

	console.log(`Started on port ${app.server.address().port}`);

});

export default app;
