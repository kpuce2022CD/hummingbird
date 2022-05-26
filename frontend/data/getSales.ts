import axios from 'axios';
import { start } from 'repl';

export const getSales = (
  ownerId: string,
  startDate: string,
  endDate: string
) => {
  axios({
    method: 'get',
    url: 'http://localhost:8080/api/orders/sales',
    params: {
      ownerId: ownerId,
      start: startDate,
      end: endDate,
    },
  })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};
