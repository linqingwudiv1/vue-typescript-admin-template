

import express,{Express,Router} from 'express';
import path from 'path';
import {readFileSync} from 'fs';

import homeRoute from './controller/home';
import articlesRoute from './controller/articles';
import pageviewsRoute from './controller/pageviews';
import userRoute from './controller/user';
import transactionRoute from './controller/transaction';
import roleRoute from './controller/role/role';
import routesRoute from './controller/role/routes';
export default (app:Express, http:any) => {
  app.use( express.json( {} ) );
  /** 中间件http头设置 */
  app.all( '*', ( req, res, next ) =>
  {
    //默认返回text/json
    res.setHeader('Content-Type', 'text/json;charset=utf-8');

    //将所有查询参数转换为小写.... 
    for (let key in req.query)
    {
      req.query[key.toLowerCase()] = req.query[key];
      delete req.query[key];
    }

    next();
  });

  //#region Route
  app.use('/'            , homeRoute);
  app.use('/api/articles'    , articlesRoute);
  app.use('/api/pageviews'   , pageviewsRoute);
  app.use('/api/users/'       , userRoute);
  app.use('/api/roles/'      , roleRoute);
  app.use('/api/routes/'     , routesRoute);
  app.use(`/api/transactions/`, transactionRoute);

  // app.use('/AppAPI/api/biz', BizRoute);
  //#endregion
}
