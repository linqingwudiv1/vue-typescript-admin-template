import express,{Router,Express, urlencoded} from 'express'; 
import {join} from 'path';
import fs, { stat, statSync, existsSync, exists } from 'fs';
import url from 'url';

const route = Router();


//the route url keep same on net core
route.get('/AppAPI/api/Core/AppVersion', ( req, res ) => 
{
    res.json( {data: { Version: '0.0.1', Msg:"中文测试test" } } );
});

//the route url keep same on net core
route.get('/AppAPI/api/Core/GetNeedDownloadList', ( req, res ) => 
{
  // #region  test data
  let data = [{
    "title": "管理端.zip"                 ,
    "uri"  : "public/管理端.zip"          ,
    "relativePath": "public/管理端.zip"   ,
    "contentSize":  0                    ,
    "transferSize": 0                    ,
    "segment": 0                         ,
    "segment_transferSize": 0            ,
    "fileType": 1                        ,
    "state": 0                           ,
    "requests": []
  }];

  // #endregion

  let Version = req.query.version

  res.json({data:{
    Version: Version,
    data :data
  }});
});

route.get(/public\/*.*/, (req, res, next) =>
{
  let range = req.headers["range"];

  let filepath:string = join( __dirname, '../', '../',  decodeURI(url.parse((req.url),true).pathname!)  );
  
  res.setHeader('Content-Type', 'application/octet-stream;');

  if (range == undefined)  
  {
    res.statusCode = 200;
    res.download(filepath);
    return ;
  }

  if ( !existsSync(filepath) )
  {
    res.statusCode = 404;
    res.end(`not is found...${filepath}` );
    return ;
  }

  let [,start, end] = range.match(/(\d*)-(\d*)/)!;
  let stats = statSync(filepath);
  
  let total = stats.size;
  
  let byte_start = start ? parseInt(start)  : 0;
  let byte_end   = end   ? parseInt(end)    : total - 1;

  res.setHeader('Accept-Ranges', `bytes`);
  res.setHeader('Content-Range', `bytes ${byte_start}-${byte_end}/${total}`);

  try
  {
    res.statusCode = 206;
    fs.createReadStream(filepath, { start :byte_start, end : byte_end }).pipe(res);
  }
  catch(ex)
  {
    res.statusCode = 400;
    res.end(ex);
  }
});
  
export default route;