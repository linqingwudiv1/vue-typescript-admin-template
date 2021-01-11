import faker from 'faker'
import { Response, Request,Router } from 'express'
import { asyncRoutes, constantRoutes } from './routesData'

const route = Router();

const routes = [...constantRoutes, ...asyncRoutes]
const roles: any[] = [
  {
    key: 'admin',
    name: 'admin',
    description: 'Super Administrator. Have access to view all pages.',
    routes: routes
  },
  {
    key: 'editor',
    name: 'editor',
    description: 'Normal Editor. Can see all pages except permission page',
    routes: routes.filter(i => i.path !== '/permission') // Just a mock
  },
  {
    key: 'visitor',
    name: 'visitor',
    description: 'Just a visitor. Can only see the home page and the document page',
    routes: [{
      path: '',
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: { title: 'dashboard', icon: 'dashboard' }
        }
      ]
    }]
  }
]



route.get('/', (req: Request, res: Response) => {
    return res.json({
      code: 20000,
      data: {
        total: roles.length,
        items: roles
      }
    })
  });


route.post('/', (req: Request, res: Response) => {
  return res.json({
    code: 20000,
    data: {
      key: faker.random.number({ min: 3, max: 10000 })
    }
  })
} );


route.put('/:role', (req: Request, res: Response) => {
  const { role } = req.body
  return res.json({
    code: 20000,
    data: {
      role
    }
  })
});

route.delete('/:role',  (req: Request, res: Response) => {
  return res.json({
    code: 20000,
  })
});


export default route;