import faker from 'faker'
import { Response, Request, Router } from 'express'
import { ITransactionData } from '@/api/types'
const route = Router();
const transactionList: ITransactionData[] = []
const transactionCount = 20

for (let i = 0; i < transactionCount; i++) {
  transactionList.push({
    orderId: faker.random.uuid(),
    status: faker.random.arrayElement(['success', 'pending']),
    timestamp: faker.date.past().getTime(),
    username: faker.name.findName(),
    price: parseFloat(faker.finance.amount(1000, 15000, 2))
  })
}

route.get('/', (req: Request, res: Response) => {
  return res.json({
    code: 20000,
    data: {
      total: transactionList.length,
      items: transactionList
    }
  })
});


export default route ;
