import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Cart = () => {
  interface ICartList {
    id: number;
    menuName: string;
    totalPrice: string;
  }
  const router = useRouter();
  const [cartList, setCartList] = useState<ICartList[]>([] as ICartList[]);
  useEffect(() => {
    console.log("컴포넌트가 화면에 나타남");
    let tmpArr: ICartList[] = [];
    if (sessionStorage.length !== 0) {
      for (let i = 0; i < sessionStorage.length; i++) {
        tmpArr.push(JSON.parse(sessionStorage.getItem(String(i))!));
      }
      setCartList(tmpArr);
    }
  }, []);

  const orderHandler = () => {
    alert("주문이 완료되었습니다.");
    sessionStorage.clear();
    localStorage.clear();
    router.push("/resultmenu");
  };

  return (
    <div className="w-[414px] h-[896px] bg-blue-100">
      <div className="flex justify-around">
        <button onClick={() => router.push("/resultmenu")}>
          뒤로가기 버튼
        </button>
        <span>장바구니 입니다</span>
      </div>
      {/* TODO: 옆으로 밀어보기 기능 구현 */}
      <span>옆으로 밀어보세요</span>
      {cartList.length !== 0
        ? cartList.map((item, index) => (
            <div key={index} className="bg-purple-200 m-2">
              <li>{item.menuName}</li>
              <li>{item.totalPrice}</li>
            </div>
          ))
        : null}
      <button onClick={() => orderHandler()}>주문하기 버튼</button>
    </div>
  );
};

export default Cart;
