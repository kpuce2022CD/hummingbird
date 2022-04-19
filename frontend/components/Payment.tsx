import React, { useEffect } from 'react';
import axios from "axios";
const Payment = (props:any) => {
    useEffect(()=>{
        const jquery = document.createElement("script");
        jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
        const iamport = document.createElement("script");
        iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
        document.head.appendChild(jquery);
        document.head.appendChild(iamport);
        return () => {
            document.head.removeChild(jquery);
            document.head.removeChild(iamport);
        }
    },  []);

    const sendOrder = async (order : any, imp_uid : any) => {
        try {
            order["impUid"]=imp_uid;
            console.log(order.impUid);
            const response = await axios.post("http://localhost:8080/api/orders", order, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });
            console.log(response);
        } catch (err) {
            console.log("error", err);
        }
    };

    const onClickPayment = () => {
        // @ts-ignore
        const {IMP} = window;
        IMP.init('imp18788306');
        /* 2. 결제 데이터 정의하기 */
        const data = {
            pg: 'html5_inicis',                           // PG사
            pay_method: 'card',                           // 결제수단
            merchant_uid: `mid_${new Date().getTime()}`,   // 주문번호
            amount: props.price,                                 // 결제금액
            name: '아임포트 결제 테스트',                  // 주문명
            buyer_name: '홍길동',                           // 구매자 이름
            buyer_tel: '01012341234',                     // 구매자 전화번호
            buyer_email: 'example@example',               // 구매자 이메일
            buyer_addr: '정왕동 661-16',                    // 구매자 주소
            buyer_postcode: '06018',                      // 구매자 우편번호
        };
        IMP.request_pay(data,callback);
    }

    // @ts-ignore
    const callback = (response) => {
        const {success, error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status} = response;
        if(success){
            sendOrder(props.orderDto,imp_uid)
            console.log(response)
        }else{
            alert('결제 실패 : '+error_msg);
        }
    }

    return(
        <>

            <button onClick={onClickPayment}>결제하기</button>
        </>
    )
}

export default Payment;