import React from "react";
import styled from 'styled-components';

const Info = () => {
  return (
    <div className=" bg-gray-100">
        <div>
            <h1>
                오더캔버스는 무엇인가요?
            </h1>
        </div>
        <div>
            <div>
                <img src="" alt="예시 이미지1"/>
                <img src="" alt="예시 이미지2"/>
            </div>

            <div>
                <div>간단하게 스마트 메뉴판을 만들어보세요</div>
                <h2>쉽고 간단한 메뉴판 만들기</h2>
                <div>손님들께 제공할 메뉴판을 만들어보세요.<br/>
                    메뉴 정보만 적어도 오더캔버스가 뚝딱 만들어드립니다.</div>
            </div>
        </div>

        <div>

            <div>
                <div>점원 없이 주문을 받아보세요.</div>
                <h2>손님의 주문과 결제를 한번에</h2>
                <div>손님의 주문과 결제를 온라인으로 해결해요.<br/>
                    언택트 시대에 걸맞는 메뉴판 서비스를 제공합니다.</div>
            </div>
            <div>
                <img src="" alt="예시 이미지3"/>
            </div>
        </div>

        <div>
            <div>
                <img src="" alt="주문확인페이지 예시 이미지"/>
            </div>

            <div>
                <div>고객의 주문을 간편하게 확인하세요.</div>
                <h2>접수된 주문 확인하기</h2>
                <div>결제가 된 주문을 오더캔버스의 주문표를 통해 확인하세요.<br/>
                    주문도 결제도 오더캔버스가 함께합니다.</div>
            </div>
        </div>

    </div>
  );
};

export default Info;
