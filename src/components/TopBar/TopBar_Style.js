import styled from "styled-components";

export const TopBarWrapper = styled.div`
  background: ${(props) =>
    props.page === "mypage"
      ? "linear-gradient(to bottom, skyblue, beige)"
      : "linear-gradient(to bottom, skyblue, #f2ea9b)"};
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "GmarketSansMedium", sans-serif;
`;

export const Title = styled.div`
  font-size: 24px;
  flex-grow: 1;
  text-align: center;
  font-family: "OKDDUNG", sans-serif;
`;
export const SubTitle = styled.div`
  font-size: 12px;
  font-family: "GmarketSansMedium", sans-serif;
`;

export const ButtonWrapper = styled.div`
  display: flex;
`;
