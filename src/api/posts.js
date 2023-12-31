import axios from "axios";

const getPosts = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/post`);
  console.log(process.env.REACT_APP_SERVER_URL);
  return response.data;
};

const addPost = async (newTodo) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/post`, newTodo);
};

export { getPosts, addPost };
