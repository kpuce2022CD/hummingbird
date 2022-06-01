export type IOrderItemList = {
  foodName: string;
  orderDate: string;
  orderItemId: number;
  orderId: number;
  status: string;
  tableNum: number;
};

export type IOrderInfo = {
  ownerId: number;
  orderItemList: IOrderItemList[];
};
