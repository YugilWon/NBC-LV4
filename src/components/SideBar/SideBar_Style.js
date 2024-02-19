import styled from "styled-components";

export const SidebarWrapper = styled.div`
  position: fixed;
  top: 40%;
  right: 30px;
  height: 110px;
  width: 25px;
  padding: 20px;
  z-index: 2;
  @media screen and (max-width: 768px) {
    position: fixed;
    top: auto;
    right: 0;
    bottom: 0;
    width: 100%;
    height: auto;
    padding: 10px;
  }
`;

export const IconLink = styled.a`
  display: block;
  margin-bottom: 10px;
`;

export const IconImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;
