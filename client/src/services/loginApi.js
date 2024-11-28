import axios from "axios";
import { useParams } from "react-router-dom";
const token = JSON.parse(localStorage.getItem("userInfo") || null);
export const loginApi = async ({ email, password }) => {
  const response = await axios.post("http://localhost:3000/api/auth/login", {
    email,
    password,
  });
  return response.data;
};
export const registerApi = async ({
  email,
  password,
  username,
  name,
  profilePic,
  coverPic,
}) => {
  const response = await axios.post("http://localhost:3000/api/auth/register", {
    email,
    password,
    username,
    name,
    profilePic,
    coverPic,
  });
  return response.data;
};
export const userApi = async (id) => {
  const response = await axios.get(
    `http://localhost:3000/api/auth/user/${id}`,
    {
      headers: {
        authorization: `Bearer ${token.token}`,
      },
    }
  );
  return response.data;
};
