import styled from "styled-components";

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: transparent;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: "GmarketSansMedium", sans-serif;

  &:hover {
    background-color: dodgerblue;
  }
`;
