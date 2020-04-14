import express,{Express} from 'express';
// import socketIO from "socket.io";

import bodyParser from 'body-parser'
import compression from 'compression'
import morgan from 'morgan'
import cors from 'cors'

import articleRoute from './controller/articles/article';
import roleRoute from './controller/roles/role';
import routeRoute from './controller/routes/route';
import transactionRoute from './controller/transactions/transaction';
import userRoute from './controller/users/user';

export default (app:Express, http:any) => {

    // Compression
  app.use(compression())
  // Logger
  app.use(morgan('dev'))
  // Enable CORS
  app.use(cors())
  // POST, PUT, DELETE body parser
  app.use(bodyParser.json({ limit: '20mb' }))
  app.use(bodyParser.urlencoded({
    limit: '20mb',
    extended: false
  }))
  // No cache
  app.use((req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    res.header('Pragma', 'no-cache')
    res.header('Expires', '-1')
    next()
  })

  // Catch 404 error
  app.use((req, res, next) => {
    const err = new Error('Not Found')
    res.status(404).json({
      message: err.message,
      error: err
    })
  })

  app.use('/dev-api/articles',articleRoute );
  app.use('/dev-api/roles',roleRoute );
  app.use('/dev-api/routes',routeRoute );
  app.use('/dev-api/transaction',transactionRoute );
  app.use('/dev-api/users',userRoute );
  //app.use('roles', routeRoute);

}
