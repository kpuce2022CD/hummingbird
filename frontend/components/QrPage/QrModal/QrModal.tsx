import React, { PropsWithChildren } from 'react';
import * as S from './QrModal.style';
type IQrModalProps = {
  onClickToggleModal: () => void;
};
const QrModal = ({
  onClickToggleModal,
  children,
}: PropsWithChildren<IQrModalProps>) => {
  return (
    <S.ModalContainer>
      <S.DialogBox>{children}</S.DialogBox>
      <S.Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </S.ModalContainer>
  );
};

export default QrModal;
