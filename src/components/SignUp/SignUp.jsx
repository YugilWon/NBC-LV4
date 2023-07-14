import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import {
  ModalContainer,
  ModalContainerModal,
} from "../../styled-components/Modal/Modal_Style";
import { Button } from "../../styled-components/Button/Button_Style";
import api from "../../axios/api";
import { Form, Input } from "../../styled-components/Form/Form_style";
import useInput from "../../hooks/useInput";
import { VerifyMessage } from "../../styled-components/VerifyMessage/VerifyMessage";

function SignUp() {
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [id, IdChangeHandler, resetId] = useInput();
  const [pw, PwChangeHandler, resetPw] = useInput();
  const [, PwConfirmChangeHandler, resetPwConfirm] = useInput();

  const [cookies] = useCookies(["Token"]);

  useEffect(() => {
    if (!cookies.Token) {
      setIsModalOpen2(false);
    }
  }, [cookies.Token]);

  const server = api.create({
    baseURL: "http://3.38.191.164/",
  });

  const handleModalOpen2 = () => {
    setIsModalOpen2(true);
  };

  const CancelBtnHandler = () => {
    setIsModalOpen2(false);
    resetId();
    resetPw();
    resetPwConfirm();
  };

  const SubmitBtnHandler = async () => {
    try {
      const requestBody = {
        id,
        password: pw,
      };

      if (pw.length !== 8) {
        alert("패스워드가 8자 미만입니다");
        return;
      }

      const response = await server.post("/register", requestBody);

      setIsModalOpen2(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("이미 존재하는 아이디입니다.");
      } else {
        console.log("회원가입 데이터 저장 중 오류가 발생했습니다!", error);
      }
    }
  };

  return (
    <>
      {cookies.Token ? (
        <></>
      ) : (
        <Button onClick={handleModalOpen2}>회원가입</Button>
      )}
      {isModalOpen2 && (
        <ModalContainer className="Modal-Container">
          <ModalContainerModal
            width="400px"
            height="350px"
            className="Modal-Container-Modal"
          >
            <Button onClick={CancelBtnHandler}>X</Button>
            <Form>
              <Input
                className="Id-Input"
                type="text"
                value={id}
                placeholder="아이디를 입력해주세요"
                onChange={IdChangeHandler}
              />
              <Input
                className="Pw-Input"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                onChange={PwChangeHandler}
              />
              <Input
                className="(Pw-Confirm-Input"
                type="password"
                placeholder="비밀번호 확인"
                onChange={PwConfirmChangeHandler}
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
              <Button onClick={SubmitBtnHandler}>회원가입</Button>
            </div>
          </ModalContainerModal>
        </ModalContainer>
      )}
    </>
  );
}

export default SignUp;
