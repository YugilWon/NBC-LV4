import styled from "styled-components";

export const VerifyMessage = styled.span`
  font-size: 12px;
  color: ${(props) => (props.invalid ? "red" : "blue")};
`;
