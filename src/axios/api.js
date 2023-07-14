import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 1000,
});

const addPost = async (newPost) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/Post`, newPost);
};

export { addPost };

export default instance;
