import { atom } from 'recoil';
import moment from 'moment';
import * as D from '../data';

type FoodData = {
  content: string;
  fileName: string;
  filePath: string;
  id: number;
  name: string;
  origFileName: string;
  price: number;
};

type CartData = {
  fileName: string;
  foodId: number;
  foodName: string;
  foodPrice: number;
  count: number;
};

const menuIdState = atom<string | string[]>({
  key: 'menuIdState',
  default: '',
});

const ownerIdState = atom<number>({
  key: 'ownerIdState',
  default: 0,
});

const foodListState = atom<FoodData[]>({
  key: 'foodListState',
  default: [],
});

const tabClickedState = atom<number>({
  key: 'tabClickedState',
  default: 0,
});

const tabClickedNameState = atom<string>({
  key: 'tabClickedNameState',
  default: '',
});

const CartItemState = atom<CartData[]>({
  key: 'CartItemState',
  default: [],
});

const StartDateState = atom<string>({
  key: 'StartDateState',
  default: `${moment().format('YYYY-MM-DD')} 00:00:00`,
});

const EndDateState = atom<string>({
  key: 'EndDateState',
  default: `${moment().format('YYYY-MM-DD')} 23:59:59`,
});

const OrderInfoState = atom<D.IOrderItemList[]>({
  key: 'OrderInfoState',
  default: [],
});

export {
  menuIdState,
  ownerIdState,
  foodListState,
  tabClickedState,
  tabClickedNameState,
  CartItemState,
  StartDateState,
  EndDateState,
  OrderInfoState,
};
