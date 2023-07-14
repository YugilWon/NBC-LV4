import styled from "styled-components";

export const DetailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
`;

export const DetailCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 800px;
  padding: 40px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const SpeciesWrapper = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
`;

export const VideoWrapper = styled.div`
  margin-bottom: 20px;
  padding-bottom: 10px;
  position: relative;
  width: 100%;
  max-height: 500px;
  padding-bottom: 56.25%;
`;

export const ImageWrapper = styled.div`
  margin-bottom: 20px;
  padding-bottom: 10px;
`;

export const BodyWrapper = styled.div`
  margin-bottom: 20px;
  padding-bottom: 10px;
`;

export const CautionWrapper = styled.div`
  margin-bottom: 20px;
  padding-bottom: 10px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  font-family: "GmarketSansMedium", sans-serif;
`;

export const Body = styled.p`
  font-size: 18px;
  color: black;
  line-height: 1.5;
  font-family: "GmarketSansMedium", sans-serif;
`;

export const Image = styled.img`
  max-width: 100%;
  height: auto;
`;

export const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const CommentContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

export const CommentInput = styled.input`
  width: 83%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 8px;
  font-family: "GmarketSansMedium", sans-serif;
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-left: 595px;
  margin-bottom: 20px;
`;

export const CommentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ButtonContainer2 = styled.div`
  display: flex;
`;

export const CommentText = styled.div`
  flex: 1;
  margin-top: 20px;
  font-family: "GmarketSansMedium", sans-serif;
`;
