import axios from "axios";
import { axiosJWT } from "./UserService";

const endpoint = "http://localhost:5000/api";

export const getAllProduct = async () => {
  const res = await axios.get(
    `http://localhost:5000/api/product/get-all?page=1&limit=5`
  );
  return res.data;
};

// export const getProductType = async (type, page, limit) => {
//   if (type) {
//     const res = await axios.get(
//       `http://localhost:5000/api/product/get-all?filter=type&filter=${type}&limit=${limit}&page=${page}`
//     );
//     return res.data;
//   }
// };

export const createProduct = async (data, access_token) => {
  const res = await axios.post(
    `http://localhost:5000/api/product/create`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getDetailsProduct = async (id) => {
  const res = await axios.get(
    `http://localhost:5000/api/product/get-details/${id}`
  );
  return res.data;
};

export const updateProduct = async (id, access_token, data) => {
  const res = await axiosJWT.put(
    `http://localhost:5000/api/product/update/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteProduct = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `http://localhost:5000/api/product/delete/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

// export const deleteManyProduct = async (data, access_token) => {
//   const res = await axiosJWT.post(
//     `http://localhost:5000/api/product/delete-many`,
//     data,
//     {
//       headers: {
//         token: `Bearer ${access_token}`,
//       },
//     }
//   );
//   return res.data;
// };

// export const getAllTypeProduct = async () => {
//   const res = await axios.get(`http://localhost:5000/api/product/get-all-type`);
//   return res.data;
// };

export const getCommentAndRating = async (id) => {
  const res = await axios.get(
    `http://localhost:5000/api/product/get-comment-and-rating/${id}`
  );
  return res.data;
};
