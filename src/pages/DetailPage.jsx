import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../axios/api";
import { Button } from "../styled-components/Button/Button_Style";
import TopBar from "../components/TopBar/TopBar";
import { useCookies } from "react-cookie";
import UpdatePost from "../components/UpdatePost/UpdatePost";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import {
  DetailContainer,
  DetailCard,
  SpeciesWrapper,
  Title,
  VideoWrapper,
  Video,
  ImageWrapper,
  Image,
  BodyWrapper,
  Body,
  CautionWrapper,
  CommentContainer,
  CommentInput,
  ButtonContainer,
  CommentWrapper,
  ButtonContainer2,
  CommentText,
} from "./DetailPage-styled/Detail-style";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingComment, setEditingComment] = useState("");

  const fetchPost = async () => {
    const { data } = await api.get(`/post/${id}`);

    setPost(data);
  };

  const fetchComments = async () => {
    const response = await api.get(`/Comments`);
    const commentData = response.data;
    setComments(commentData);
  };

  //삭제 함수
  const onDeleteButtonClickHandler = async (id) => {
    await api.delete(`/post/${id}`);
    setPost((prevPost) => prevPost.filter((item) => item.id !== id));
    alert("삭제가 완료되었습니다!");
    navigate(`/`);
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  //코멘트 저장 함수
  const onSaveComment = async () => {
    try {
      if (newComment.trim() === "") {
        return;
      }
      const response = await api.post(`/Comments`, {
        id: uuid(),
        postId: id,
        comment: newComment,
      });
      fetchComments();
      setNewComment("");
    } catch (error) {
      console.log("댓글 저장 중 오류가 발생했습니다!", error);
    }
  };

  const CommentDeleteBtn = async (id) => {
    await api.delete(`/Comments/${id}`);
    setComments((prevComment) => prevComment.filter((item) => item.id !== id));
    alert("삭제가 완료되었습니다!");
  };

  const CommentUpdateBtn = (id) => {
    const comment = comments.find((comment) => comment.id === id);
    setEditingCommentId(id);
    setEditingComment(comment.comment);
  };

  const onSaveEditingComment = async (id) => {
    try {
      const response = await api.patch(`/Comments/${id}`, {
        comment: editingComment,
      });
      const updatedComment = response.data;
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === updatedComment.id ? updatedComment : comment
        )
      );
      setEditingCommentId(null);
      setEditingComment("");
    } catch (error) {
      console.log("댓글 수정 중 오류가 발생했습니다!", error);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onSaveComment();
    }
  };

  const filterdComment = comments.filter((item) => item.postId === id);

  return (
    <>
      <TopBar />

      <DetailContainer>
        <DetailCard>
          <ButtonContainer>
            <UpdatePost post={post} onUpdateButtonClickHandler={fetchPost} />
            <Button onClick={() => onDeleteButtonClickHandler(post.id)}>
              ❌
            </Button>
          </ButtonContainer>
          <SpeciesWrapper>
            <Title>{post.species}</Title>
          </SpeciesWrapper>
          {post.imageUrl && (
            <ImageWrapper>
              <Image src={post.imageUrl} alt="Post Image" />
            </ImageWrapper>
          )}

          {post.videoUrl && (
            <VideoWrapper>
              <Video src={post.videoUrl} controls />
            </VideoWrapper>
          )}
          <BodyWrapper>
            <Title>우리 {post.name} 는(은)요!</Title>
            <br />
            <Body>{post.body}</Body>
            <br />
          </BodyWrapper>
          <CautionWrapper>
            <Title>신경써주세요!</Title>
            <Body>{post.caution}</Body>
          </CautionWrapper>
          <CommentContainer>
            {filterdComment.map((comment) => (
              <div key={comment.id}>
                {editingCommentId === comment.id ? (
                  <>
                    <input
                      type="text"
                      value={editingComment}
                      onChange={(e) => setEditingComment(e.target.value)}
                    />
                    <Button onClick={() => onSaveEditingComment(comment.id)}>
                      저장
                    </Button>
                  </>
                ) : (
                  <>
                    <CommentWrapper>
                      <CommentText>{comment.comment}</CommentText>
                      {editingCommentId !== comment.id && (
                        <ButtonContainer2>
                          <Button onClick={() => CommentDeleteBtn(comment.id)}>
                            ❌
                          </Button>
                          <Button onClick={() => CommentUpdateBtn(comment.id)}>
                            ✏️
                          </Button>
                        </ButtonContainer2>
                      )}
                    </CommentWrapper>
                  </>
                )}
              </div>
            ))}
            <CommentInput
              type="text"
              placeholder="댓글을 입력하세요"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={onKeyDown}
            />
            <Button onClick={onSaveComment}>댓글 추가</Button>
          </CommentContainer>
        </DetailCard>
      </DetailContainer>
    </>
  );
}

export default DetailPage;
