import React,{useEffect} from 'react'
import {NextPage} from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';

const completepay: NextPage = () => {
    const router = useRouter();
  const {menuId, ownerId, table,amount} = router.query;
    let err ='';
    const result = '';
   //모바일 환경 결제 로직 추가

   type CartData = {
    fileName: string;
    foodId: number;
    foodName: string;
    foodPrice: number;
    count: number;
  };

   const createOrder = async (
    itemList: CartData[],
    impUid: String,
    amount: number
  ) => {
    try {
      let orderCreateRequest = {
        tableNumber: table,
        impUid: impUid,
        ownerId: ownerId,
        cartDataList: itemList,
        totalPrice: amount,
      };

      const response = await axios.post(
        'http://34.64.187.105:8080/api/orders',
        orderCreateRequest,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

   useEffect(() => {
    if (typeof router.query.imp_success !== 'undefined') {
      console.log(router.query.imp_success);
      const tmpItemList = JSON.parse(localStorage.itemList);
      if (router.query.imp_success === 'true') {
        alert('결제 성공');
        void createOrder(tmpItemList, String(router.query.imp_uid), Number(amount)).then(() =>{
          localStorage.clear()
          window.location.replace(`http://34.64.187.105:3000/resultmenu?menuId=${menuId}&ownerId=${ownerId}&table=${table}`);
        })

      } else {
        alert('결제실패');
      }
    }
    else{ 
        err='라우팅 에러임'
    }
  }, [router.query.imp_success]);
    return(
        <>

        </>
    );
};

export default completepay;