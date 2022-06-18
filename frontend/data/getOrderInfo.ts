import axios from 'axios';
import { IOrderItemList } from './IOrderInfo';

export const getOrderInfo = (
  ownerId: string,
  status: number,
  startDate?: string,
  endDate?: string
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
    axios({
      method: 'get',
      url: `http://34.64.187.105:8080/api/orders/items/${ownerId}`,
      params: {
        status: statusStr,
        start: startDate,
        end: endDate,
      },
    })
      .then(({ data }) => {
        resolve(data.orderItemList);
      })
      .catch(reject);
  });
