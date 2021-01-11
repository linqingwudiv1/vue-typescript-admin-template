import { Request,Response,Router } from 'express'
import { asyncRoutes, constantRoutes } from './routesData'
const routes = [...constantRoutes, ...asyncRoutes]

const route = Router();

route.get('/', (req: Request, res: Response) => {
    return res.json({
      code: 20000,
      data: {
        routes
      }
    })
  });
  
  

export default route;