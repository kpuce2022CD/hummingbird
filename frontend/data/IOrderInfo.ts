export type IOrderFood = {
  count: number;
  fileName: string;
  foodName: string;
  foodPrice: number;
};

export type IOrderInfo = {
  orderDate: string;
  orderId: number;
  orderItemList: IOrderFood[];
  orderStatus: string;
};
