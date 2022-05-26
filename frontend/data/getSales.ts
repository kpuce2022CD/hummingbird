import axios from 'axios';
import { start } from 'repl';

export type ISales = {
  sales: number;
};

export const getSales = (
  ownerId: string,
  startDate: string,
  endDate: string
): Promise<ISales> =>
  new Promise((resolve, reject) => {
    console.log(startDate, endDate);
    axios({
      method: 'get',
      url: `http://localhost:8080/api/orders/sales/${ownerId}`,
      params: {
        start: startDate,
        end: endDate,
      },
    })
      .then(({ data }) => {
        resolve(data);
      })
      .catch(reject);
  });
