import axios from 'axios';
import { useCallback, useState } from 'react';

export type IUseFetchData = {
  url: string;
  headers: any;
  payload: any;
};

export const useFetchData = ({ url, headers, payload }: IUseFetchData) => {
  const [res, setRes] = useState({ data: null, error: null, isLoading: false });
  // You POST method here
  const callAPI = useCallback(() => {
    setRes((prevState) => ({ ...prevState, isLoading: true }));
    axios
      .post(url, headers, payload)
      .then((res) => {
        setRes({ data: res.data, isLoading: false, error: null });
      })
      .catch((error) => {
        setRes({ data: null, isLoading: false, error });
      });
  }, [url, headers, payload]);
  return [res, callAPI];
};
