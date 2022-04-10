import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import MenuModal from "../MenuModal";
import * as S from "./style";
type Props = {
  menuId: number;
  menuName: string;
};

const MenuCard = ({ menuId, menuName }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuWrapState, setMenuWrapState] = useState("");
  const router = useRouter();
  const btnList = [
    {
      value: "qr",
      content: "QR 코드 만들기",
    },
    {
      value: "edit",
      content: "메뉴판 수정하기",
    },
    {
      value: "delete",
      content: "메뉴판 삭제하기",
    },
  ];

  const deleteMenuDelete = async (menuId: number) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/menu/delete",
        {},
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          params: {
            menuId: menuId,
          },
        }
      );
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = e.target as Element;

    switch (target.id) {
      case "qr": {
        router.push({
          pathname: "/qrpage",
          query: { menuId: menuId },
        });
        break;
      }
      case "edit": {
        console.log("edit");
        setModalOpen(true);
        setMenuWrapState("메뉴판수정");
        break;
      }
      case "delete": {
        console.log("delete");
        deleteMenuDelete(menuId);
        break;
      }
      default:
        console.log("err!");
        break;
    }
  };

  return (
    <S.CardWrap>
      <ul>
        <S.CardTitle>
          <h2>{menuName}</h2>
        </S.CardTitle>
        <S.CardSubTitle>
          <p>
            메뉴판 번호 : <span>{menuId}</span>
          </p>
        </S.CardSubTitle>
      </ul>
      {/* TODO: map으로 반복문 만들고 event delegation을 통해 중복 이벤트 제거 */}
      <S.ButtonWrap>
        {btnList.map((val, idx) => (
          <S.Button key={idx} id={val.value} onClick={(e) => handleBtnClick(e)}>
            {val.content}
          </S.Button>
        ))}
      </S.ButtonWrap>
      {modalOpen && (
        <MenuModal
          setModalOpen={setModalOpen}
          type={menuWrapState}
          menuId={menuId}
        />
      )}
    </S.CardWrap>
  );
};

export default MenuCard;
