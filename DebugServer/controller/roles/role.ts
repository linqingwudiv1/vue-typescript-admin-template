import faker from 'faker'
import { Response, Request, Router } from 'express'
import { asyncRoutes, constantRoutes } from '../routes/route'
import { IRoleData } from '@/api/types';

const route = Router();
const routes = [...constantRoutes, ...asyncRoutes]
const roles: IRoleData[] = [
  {
    key: '1',
    name: 'admin',
    description: 'Super Administrator. Have access to view all pages.',
    routes: routes
  },
  {
    key: '2',
    name: 'editor',
    description: 'Normal Editor. Can see all pages except permission page',
    routes: routes.filter(i => i.path !== '/permission') // Just a mock
  },
  {
    key: '3',
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

route.get('/', (req, res) => {
  return res.json({
    code: 20000,
    data: {
      total: roles.length,
      items: roles
    }
  })  
});

route.post('/', (req, res) => {
  return res.json({
    code: 20000,
    data: {
      key: faker.random.number({ min: 3, max: 10000 })
    }
  })
});


route.put('/',  (req, res) => {
  const { role } = req.body
  return res.json({
    code: 20000,
    data: {
      role
    }
  })
});

route.delete('/', (req, res) => {
  return res.json({
    code: 20000,
  })
});


export default route ;