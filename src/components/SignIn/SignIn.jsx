import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import {
  ModalContainer,
  ModalContainerModal,
} from "../../styled-components/Modal/Modal_Style";
import { Button } from "../../styled-components/Button/Button_Style";
import { Input, Form } from "../../styled-components/Form/Form_style";
import api from "../../axios/api";
import axios from "axios";
import useInput from "../../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { VerifyMessage } from "../../styled-components/VerifyMessage/VerifyMessage";

function SignIn() {
  //커스텀 훅
  const [id, IdChangeHandler, resetId] = useInput();
  const [pw, PwChangeHandler, resetPw] = useInput();
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["Token"]);
  const navigate = useNavigate();

  const handleModalOpen1 = () => {
    setIsModalOpen1(true);
  };

  const CancelBtnHandler = () => {
    setIsModalOpen1(false);
    resetId();
    resetPw();
  };

  const server = api.create({
    baseURL: "http://3.38.191.164/",
  });

  //토큰이 자동으로 expire되지 않아서 로그인 해서 토큰을 받아서 쿠키로 저장했을 때 타이머 동작
  useEffect(() => {
    let logoutTimeout = null;

    if (cookies.Token) {
      logoutTimeout = setTimeout(() => {
        LogoutBtnHandler();
        alert("세션이 만료되어 로그아웃되었습니다.");
      }, 600000); // 1000 = 1초
    }

    return () => {
      clearTimeout(logoutTimeout);
    };
  }, [cookies.Token]);

  const LoginBtnHandler = async () => {
    if (id === "" || pw === "") {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    if (pw.length !== 8) {
      alert("패스워드가 8자 미만입니다");
      return;
    }

    try {
      const response = await axios.post(`http://3.38.191.164/login`, {
        id,
        password: pw,
      });
      setCookie("Token", response.data.token, {
        path: `http://3.38.191.164/login`,
      });
      setCookie("Id", id);
      handleMyPageClick();
      setIsModalOpen1(false);
    } catch (error) {
      console.error("로그인 요청 에러:", error);
      if (error.response.status === 401) {
        const errorMessage = error.response.data.message;

        if (errorMessage === "사용자를 찾을 수 없습니다.") {
          alert("존재하지 않는 ID입니다");
        } else if (errorMessage === "잘못된 비밀번호입니다.") {
          alert("잘못된 비밀번호 입니다.");
        }
      }
    }
  };

  const getUserData = async () => {
    try {
      const response = await axios.get("http://3.38.191.164/user", {
        headers: {
          authorization: `Bearer ${cookies.Token}`,
        },
      });
    } catch (error) {
      console.error("사용자 데이터 요청 에러:", error);
    }
  };

  const LogoutBtnHandler = () => {
    removeCookie("Token", {
      path: "http://3.38.191.164/login",
    });
    removeCookie("Id");
    alert("로그아웃 됐습니다!");
    navigate("/");
  };

  const handleMyPageClick = () => {
    const savedId = cookies.Id;

    if (savedId) {
      navigate(`/mypage/${savedId}`);
    }
  };

  return (
    <>
      {cookies.Token ? (
        <>
          <Button onClick={LogoutBtnHandler}>로그아웃</Button>
          <Button onClick={handleMyPageClick}>마이페이지</Button>
        </>
      ) : (
        <Button onClick={handleModalOpen1}>로그인</Button>
      )}
      {isModalOpen1 && (
        <ModalContainer className="Modal-Container">
          <ModalContainerModal
            width="400px"
            height="280px"
            className="Modal-Container-Modal"
          >
            <Button onClick={CancelBtnHandler}>X</Button>
            <Form>
              <Input
                className="Id-Input"
                type="text"
                placeholder="아이디를 입력해주세요"
                onChange={IdChangeHandler}
              />
              <Input
                className="Pw-Input"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                onChange={PwChangeHandler}
              />
              {pw.length > 0 && (
                <>
                  {pw.length < 8 ? (
                    <VerifyMessage invalid="true">
                      비밀번호가 8자리 미만입니다.
                    </VerifyMessage>
                  ) : (
                    <VerifyMessage>비밀번호가 8자리 이상입니다!</VerifyMessage>
                  )}
                  <br />
                </>
              )}
            </Form>
            <div style={{ textAlign: "center" }}>
              <Button onClick={LoginBtnHandler}>로그인</Button>
              <Button onClick={getUserData}>사용자 데이터 가져오기</Button>
            </div>
          </ModalContainerModal>
        </ModalContainer>
      )}
    </>
  );
}

export default SignIn;
