import styled from "styled-components";

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  z-index: 9999;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContainerModal = styled.div`
  width: ${({ width }) => width || "fit-content"};
  height: ${({ height }) => height || "fit-content"};
  z-index: 9999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
`;
