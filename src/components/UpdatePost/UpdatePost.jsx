import React, { useState } from "react";
import { Button } from "../../styled-components/Button/Button_Style";
import {
  Form,
  Label,
  Input,
  FormContainer,
  Textarea,
} from "../Card/Card_Style";
import {
  ModalContainer,
  ModalContainerModal,
} from "../../styled-components/Modal/Modal_Style";
import FileUpload from "../FileUpload/FileUpload";
import api from "../../axios/api";
import useInput from "../../hooks/useInput";

function UpdatePost({ post, onUpdateButtonClickHandler }) {
  const [name, NameChangeHandler, resetname] = useInput();
  const [body, BodyChangeHandler, resetbody] = useInput();
  const [species, SpeciesChangeHandler, resetspecies] = useInput();
  const [caution, CautionChangeHandler, resetcation] = useInput();
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  const [imgDownloadURL, setImgDownloadURL] = useState("");
  const [videoDownloadURL, setVideoDownloadURL] = useState("");

  const handleModalOpen4 = () => {
    setIsModalOpen4(true);
  };

  const CancelBtnHandler = () => {
    setIsModalOpen4(false);
    resetname();
    resetbody();
    resetspecies();
    resetcation();
  };

  const handleImgUpload = (downloadURL) => {
    setImgDownloadURL(downloadURL);
  };

  const handleVideoUpload = (downloadURL) => {
    setVideoDownloadURL(downloadURL);
  };

  const UpdateBtnHandler = async () => {
    try {
      let imageUrl = post.imageUrl;
      let videoUrl = post.videoUrl;
      if (imgDownloadURL) {
        const response = await api.patch(`/Post/${post.id}`, {
          imageUrl: imgDownloadURL,
        });
        imageUrl = response.data.imageUrl;
      }
      if (videoDownloadURL) {
        const response = await api.patch(`/Post/${post.id}`, {
          videoUrl: videoDownloadURL,
        });
        videoUrl = response.data.videoUrl;
      }
      const updatedPost = {
        ...post,
        name,
        body,
        species,
        caution,
        imageUrl,
        videoUrl,
      };
      await api.patch(`/Post/${post.id}`, updatedPost);
      onUpdateButtonClickHandler(updatedPost);
      setIsModalOpen4(false);
    } catch (error) {
      console.log("글 저장 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <>
      <Button onClick={handleModalOpen4}>✏️</Button>
      {isModalOpen4 && (
        <ModalContainer className="Modal-Container">
          <ModalContainerModal
            width="400px"
            height="800px"
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
              <FileUpload setDownloadURL={handleImgUpload} />
              <FileUpload setDownloadURL={handleVideoUpload} />
              <Button onClick={UpdateBtnHandler}>수정하기</Button>
            </FormContainer>
          </ModalContainerModal>
        </ModalContainer>
      )}
    </>
  );
}

export default UpdatePost;
