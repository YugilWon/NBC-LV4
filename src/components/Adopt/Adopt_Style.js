import styled from "styled-components";

export const VideoContainer = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: auto;
  z-index: 1;
  aspect-ratio: 16 / 9;
`;

export const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -270px;
  margin-bottom: 300px;
  position: sticky;
  top: 0;
  z-index: 2;
`;

export const ContentText = styled.div`
  position: relative;
  font-family: "GmarketSansMedium", sans-serif;
  line-height: 35px;
  font-size: 25px;
  z-index: 1;

  h2 {
    font-size: 45px;
    font-weight: bold;
    transition: font-size 0.3s ease-in-out;
  }

  p {
    color: black;
    text-align: justify;
    line-height: 40px;
    margin-top: 20px;
    width: 600px;
  }

  &:hover {
    h2 {
      font-size: 90px;
    }
  }
`;

export const Container = styled.div`
  background-color: #f2ea9b;
  height: 600px;
`;
