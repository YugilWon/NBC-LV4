import React, { useState } from "react";
import { storage } from "../../service/Firebase";
import {
  ModalContainer,
  ModalContainerModal,
} from "../../styled-components/Modal/Modal_Style";
import { Button } from "../../styled-components/Button/Button_Style";
import { Form, Label, Input, FormContainer, Textarea } from "./Card_Style";
import FileUpload from "../FileUpload/FileUpload";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import uuid from "react-uuid";
import useInput from "../../hooks/useInput";
import { addPost } from "../../api/posts";
import { useMutation, useQueryClient } from "react-query";

function PostCards() {
  const [name, NameChangeHandler, resetName] = useInput();
  const [body, BodyChangeHandler, resetBody] = useInput();
  const [species, SpeciesChangeHandler, resetSpecies] = useInput();
  const [caution, CautionChangeHandler, resetCaution] = useInput();
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [imgdownloadURL, setImgDownloadURL] = useState("");
  const [videodownloadurl, setVideoDownloadURL] = useState("");

  //리액트 쿼리 관련 코드
  const queryClient = useQueryClient();
  const mutation = useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("Post");
    },
  });

  const handleModalOpen3 = () => {
    setIsModalOpen3(true);
  };

  const CancelBtnHandler = () => {
    setIsModalOpen3(false);
    resetName();
    resetBody();
    resetSpecies();
    resetCaution();
  };

  const PostBtnHandler = async () => {
    try {
      // 이미지 업로드
      if (imgdownloadURL) {
        const imageRef = ref(storage, `image_${Date.now()}`);
        await uploadBytes(imageRef, imgdownloadURL);
        const imageUrl = await getDownloadURL(imageRef);
      }

      // 동영상 업로드
      if (videodownloadurl) {
        const videoRef = ref(storage, `video_${Date.now()}`);
        await uploadBytes(videoRef, videodownloadurl);
        const videoUrl = await getDownloadURL(videoRef);
      }

      const response = {
        id: uuid(),
        name,
        body,
        species,
        caution,
        imageUrl: imgdownloadURL,
        videoUrl: videodownloadurl,
      };

      await mutation.mutate(response);
      resetName();
      resetBody();
      resetSpecies();
      resetCaution();
      setIsModalOpen3(false);
      setImgDownloadURL("");
      setVideoDownloadURL("");
    } catch (error) {
      console.log("글 저장 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <>
      <button
        onClick={handleModalOpen3}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          marginBottom: "100px",
        }}
      >
        <img
          src={process.env.PUBLIC_URL + "/animation-write.gif"}
          alt="Write"
          style={{
            width: "100px",
            height: "100px",
            position: "relative",
            left: "-40px",
          }}
        />
      </button>
      {isModalOpen3 && (
        <ModalContainer className="Modal-Container">
          <ModalContainerModal
            width="550px"
            height="830px "
            className="Modal-Container-Modal"
          >
            <Button onClick={CancelBtnHandler}>X</Button>
            <FormContainer className="Post-Container">
              <Form className="Name-Form">
                <Label className="Name-Label"></Label>
                <Input
                  className="Name-Input"
                  placeholder="이름을 입력해 주세요"
                  value={name}
                  onChange={NameChangeHandler}
                ></Input>
              </Form>

              <Form className="Species-Form">
                <Label className="Species-Label"></Label>
                <Input
                  className="Species-Input"
                  placeholder="품종을 입력해주세요"
                  value={species}
                  onChange={SpeciesChangeHandler}
                ></Input>
              </Form>

              <Form className="Body-Input">
                <Label className="Body-Label"></Label>
                <Textarea
                  className="Body-Textarea"
                  placeholder="소개글을 입력해 주세요"
                  value={body}
                  onChange={BodyChangeHandler}
                ></Textarea>
              </Form>

              <Form className="Caution-Form">
                <Label className="Caution-Label"></Label>
                <Textarea
                  className="Body-Textarea"
                  placeholder="주의사항을 입력해 주세요"
                  value={caution}
                  onChange={CautionChangeHandler}
                ></Textarea>
              </Form>
              <FileUpload setDownloadURL={setImgDownloadURL} />
              <FileUpload setDownloadURL={setVideoDownloadURL} />
              <Button onClick={PostBtnHandler} style={{ marginTop: "20px" }}>
                글올리기
              </Button>
            </FormContainer>
          </ModalContainerModal>
        </ModalContainer>
      )}
    </>
  );
}

export default PostCards;
