import faker from 'faker'
import { Response, Request, Router } from 'express'
import { readFileSync } from 'fs';
import path,{ join,resolve as PathResolve } from 'path';

const route = Router();

const userList: any[] = [
  {
    id: 0,
    username: 'admin',
    password: 'any',
    name: 'Super Admin',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    introduction: 'I am a super administrator',
    email: 'admin@test.com',
    phone: '1234567890',
    roles: [{key : 1 ,name : 'admin', displayName : '管理员'}],
  },
  {
    id: 1,
    username: 'editor',
    password: 'any',
    name: 'Normal Editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    introduction: 'I am an editor',
    email: 'editor@test.com',
    phone: '1234567890',
    roles: [ {key: 1, name :'developer', displayName:'开发人员'} ],
  }
]
const userCount = 100

for (let i = 2; i < userCount; i++) {
  userList.push({
    id: i,
    username: 'user_' + faker.random.alphaNumeric(9),
    password: faker.random.alphaNumeric(20),
    name: faker.name.findName(),
    avatar: faker.image.imageUrl(),
    introduction: faker.lorem.sentence(20),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    roles: ['visitor']
  })
}

/**
 * 
 */
route.post('/register', (req: Request, res: Response)=>
{
    return res.json({
        code: 20000
      });
});

/**
 * 登入
 */
route.post('/login', (req: Request, res: Response) => {
  const { username } = req.body
  for (const user of userList) {
    if (user.username === username) {
      return res.json({
        code: 20000,
        data: {
          accessToken: username + '-token',
          state : 1,
          refreshToken : username + '-refresh-token',
        }
      })
    }
  }

  return res.status(400).json({
    code: 50004,
    messaege: 'Invalid User'
  })
});

/**
 * 登出
 */
route.post('/logout', (req: Request, res: Response) => {
  return res.json({
    code: 20000
  })
});

/**
 * 获取所有用户信息
 */
route.get(`/`, (req: Request, res: Response) => {
  const { name } = req.query
  const users = userList.filter(user => {
    const lowerCaseName = user.name.toLowerCase()
    return !(name && lowerCaseName.indexOf((name as string).toLowerCase()) < 0)
  })
  return res.json({
    code: 20000,
    data: {
      items: users
    }
  })
});

/**
 * 
 */
route.post('/info', (req: Request, res: Response) => {
  // Mock data based on access token
  return res.json({
    code: 20000,
    data: {
      user: req.header('X-Access-Token') == 'admin-token' ? userList[0] : userList[1]
    }
  })
});


/**
 * 
 */
import {userroute} from './userdata';
route.get('/getRoutes', (req, res) => {
  //let jsonpath = join(__dirname, 'userdata.json');
  //const json = readFileSync(jsonpath, 'utf-8') ;
  //jsonpath = PathResolve(jsonpath);
  
  return res.json({
    data :userroute,
    code: 20000,
    desc: ''
  })
});


/**
 * getUserByName
 */
route.get('/:username', (req: Request, res: Response) => {
  const { username } = req.params
  for (const user of userList) {
    if (user.username === username) {
      return res.json({
        code: 20000,
        data: {
          user
        }
      })
    }
  }
  return res.status(400).json({
    code: 50004,
    messaege: 'Invalid User'
  })
});

/**
 * 
 */
route.put('/:username',(req: Request, res: Response) => {
  const { username } = req.params
  const { user } = req.body
  for (const v of userList) {
    if (v.username === username) {
      return res.json({
        code: 20000,
        data: {
          user
        }
      })
    }
  }

  return res.status(400).json({
    code: 50004,
    messaege: 'Invalid User'
  })
});

/**
 * 
 */
route.delete('/:username', (req: Request, res: Response) => {
  return res.json({
    code: 20000
  })
});




export default route;