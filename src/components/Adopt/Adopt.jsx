import React, { useRef } from "react";
import {
  Video,
  VideoContainer,
  ContentContainer,
  ContentText,
  Container,
} from "./Adopt_Style";
import { Button } from "../../styled-components/Button/Button_Style";

const videoUrl = process.env.PUBLIC_URL + "/videos/dog-to-help.mp4";

function Adopt() {
  const contentRef = useRef(null);

  const handleScrollToContent = () => {
    contentRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      <Container>
        <VideoContainer>
          <Video autoPlay muted loop>
            <source src={videoUrl} type="video/mp4" />
          </Video>
        </VideoContainer>
        <Button
          style={{
            width: "120px",
            height: "40px",
            position: "absolute",
            top: "600px",
            left: "200px",
            borderRadius: "10px",
            border: "none",
            background: "white",
            fontSize: "16px",
          }}
          onClick={handleScrollToContent}
        >
          둘러보기
        </Button>
      </Container>

      <div ref={contentRef}>
        <div style={{ textAlign: "center", marginTop: "300px" }}>
          <ContentText>
            <h2>🤔입양 전 다시 생각해 보세요.</h2>
          </ContentText>
        </div>
        <ContentContainer style={{ marginTop: "300px" }}>
          <div>
            <img
              src={
                "https://images.unsplash.com/photo-1600077106724-946750eeaf3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
              }
              style={{
                width: "500px",
                borderRadius: "30px",
                marginRight: "50px",
              }}
            ></img>
          </div>

          <ContentText>
            <p>
              다른 반려동물을 들일 때도 마찬가지이지만, 유기견을 입양할 때는 더
              신중할 필요가 있습니다. 단순히 불쌍한 마음에 입양했다가 또다시
              버려지는 일이 발생해서는 안 되기 때문입니다. 나와 내 가족이
              반려동물을 들이려는 이유가 무엇인지 진지하게 생각해 보고, 주거
              환경이나 라이프스타일, 경제적 여건 등을 골고루 따져 또 하나의
              생명을 책임질 준비가 충분히 되었는지 판단해 보시고 특히, 그저 말
              잘 듣고 애교와 귀염성이 넘치는 애완견을 기대했다면 다시 생각해
              보기를 권장합니다. 한 번 상처를 받은 유기견들은 새로운 주인에게
              마음을 열기까지 생각보다 오랜 시간이 걸릴 수 있습니다.
            </p>
          </ContentText>
        </ContentContainer>
      </div>
    </>
  );
}
export default Adopt;
