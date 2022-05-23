export type IOrderFood = {
  fileName: string;
  foodId: number;
  foodName: string;
  foodPrice: number;
};

export type IOrderInfo = {
  orderDate: string;
  orderId: number;
  orderItemList: IOrderFood[];
  orderStatus: string;
};
