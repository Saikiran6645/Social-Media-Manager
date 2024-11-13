import axios from "axios";
export const loginApi = async ({ email, password }) => {
  const response = await axios.post("http://localhost:3000/api/auth/login", {
    email,
    password,
  });
  return response.data;
};
export const registerApi=async({email,password,username,name,profilePic,coverPic})=>{
  const response=await axios.post("http://localhost:3000/api/auth/register",{
    email,
    password,
    username,
    name,
    profilePic,
    coverPic
  });
  return response.data;
}