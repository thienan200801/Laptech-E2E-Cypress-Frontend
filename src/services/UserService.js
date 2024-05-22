import axios from "axios";

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
  const res = await axios.post(`http://localhost:5000/api/user/login`, data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await axios.post(`http://localhost:5000/api/user/register`, data);
  return res.data;
};

export const getDetailsUser = async (id, access_token) => {
  const res = await axiosJWT.get(
    `http://localhost:5000/api/user/get-details/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteUser = async (id, access_token, data) => {
  const res = await axiosJWT.delete(
    `http://localhost:5000/api/user/delete-user/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllUser = async (access_token) => {
  const res = await axiosJWT.get(`http://localhost:5000/api/user/getAll`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const refreshToken = async (refresh_token) => {
  const res = await axios.post(
    `http://localhost:5000/api/user/refresh-token`,
    {
      refresh_token,
    },
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(`http://localhost:5000/api/user/log-out`);
  return res.data;
};

export const updateUser = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `http://localhost:5000/api/user/update-user/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const addUserCart = async (id, cartData, access_token) => {
  const res = await axiosJWT.post(
    `http://localhost:5000/api/user/cart-user/${id}`,
    cartData,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );

  return res.data;
};

export const getUserCart = async (id, access_token) => {
  const res = await axiosJWT.get(
    `http://localhost:5000/api/user/get-cart-user/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const updateUserCart = async (id, idProduct, amount, access_token) => {
  const res = await axiosJWT.put(
    `http://localhost:5000/api/user/update-cart-user/${id}/${idProduct}`,
    { amount },
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteUserCart = async (id, idProduct, access_token) => {
  const res = await axiosJWT.delete(
    `http://localhost:5000/api/user/delete-cart-user/${id}/${idProduct}`,

    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteAllUserCart = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `http://localhost:5000/api/user/delete-all-cart-user/${id}`,

    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const postCommentAndRating = async (id, data, access_token) => {
  const res = await axiosJWT.post(
    `http://localhost:5000/api/user/post-comment-and-rating/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
