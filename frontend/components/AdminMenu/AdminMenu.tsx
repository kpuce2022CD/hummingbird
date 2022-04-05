import React, { useState } from "react";
import * as S from "./style";
import EditPlusBtn from "../EditPlusBtn";
import MenuModal from "../MenuModal";

const AdminMenu = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <S.HeaderWrap>
        <S.HeaderTitle>메뉴판 추가</S.HeaderTitle>
        <span onClick={() => setModalOpen(true)}>
          <EditPlusBtn />
        </span>
      </S.HeaderWrap>
      <S.MenuContent></S.MenuContent>
      {modalOpen && <MenuModal setModalOpen={setModalOpen} type="메뉴판" />}
    </div>
  );
};

export default AdminMenu;
