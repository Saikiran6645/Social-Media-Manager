import axios from "axios";
const token = JSON.parse(localStorage.getItem("userInfo") || null);
export const getPostApi = async () => {
  const response = await axios.get("http://localhost:3000/api/posts/get", {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });
  return response.data;
};
export const postApi = async ({ desc, img, id }) => {
  const response = await axios.post(
    "http://localhost:3000/api/posts/create",
    {
      desc,
      img,
      userId: id,
    },
    {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    }
  );
  return response.data;
};
