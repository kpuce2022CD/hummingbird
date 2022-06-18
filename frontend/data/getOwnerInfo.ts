import axios from 'axios';

export type IOwnerInfo = {
  ownerId: number;
  userName: String;
  userEmail: String;
  businessRegistrationNumber: String;
};

export const getOwnerInfo = (): Promise<IOwnerInfo[]> =>
  new Promise((resolve, reject) => {
    axios
      .get(`http://34.64.187.105:8080/api/owner`)
      .then(({ data }) => {
        resolve(data);
      })
      .catch(reject);
  });
