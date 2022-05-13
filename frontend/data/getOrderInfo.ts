import { rejects } from 'assert';
import axios from 'axios';
import { resolve } from 'path';
import { IOrderInfo } from './IOrderInfo';

export const getOrderInfo = (): Promise<IOrderInfo[]> =>
  new Promise((resolve, reject) => {
    axios
      .get('http://localhost:4000/orderInfoList')
      .then(({ data }) => {
        resolve(data);
      })
      .catch(reject);
  });
