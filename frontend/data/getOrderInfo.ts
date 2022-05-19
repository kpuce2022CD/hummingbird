import axios from 'axios';
import { IOrderInfo } from './IOrderInfo';

export const getOrderInfo = (ownerId: string): Promise<IOrderInfo[]> =>
  new Promise((resolve, reject) => {
    axios
      .get(`http://localhost:8080/api/orders/bill/${ownerId}`)
      .then(({ data }) => {
        resolve(data);
      })
      .catch(reject);
  });
