import axios from 'axios';
import { IOrderItemList } from './IOrderInfo';

export const getOrderInfo = (
  ownerId: string,
  status: number
): Promise<IOrderItemList[]> =>
  new Promise((resolve, reject) => {
    let statusStr = 'DOING';
    switch (status) {
      case 0: {
        statusStr = 'DOING';
        break;
      }
      case 1: {
        statusStr = 'DONE';
        break;
      }
      case 2: {
        statusStr = 'CANCEL';
      }
    }
    axios
      .get(
        `http://localhost:8080/api/orders/items/${ownerId}?status=${statusStr}`
      )
      .then(({ data }) => {
        resolve(data.orderItemList);
      })
      .catch(reject);
  });
