import Order from '../../models/Order';
import {connectToDatabase} from "../../utils/mongodb"
import type { NextApiRequest, NextApiResponse } from 'next'
export default async (req: NextApiRequest, res: NextApiResponse) => {

  let { db } = await connectToDatabase();

  const newOrder = await new Order(req.body)
  console.log(req.body)
  console.log(newOrder)
  try {
    const response = await db.collection('orders').insertOne(newOrder);
    const data = await db.collection('orders').findOne(response.insertedId)
    res.status(200).json({RequestId: data._id,Amount: data.Amount})
  } catch(err) {
    res.json(err);
  }
}