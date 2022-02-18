import axios from "axios";
const apiUrl = process.env.REACT_API_URL;

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/auth/login`,
      userData
    );
    const { user, token } = response.data;
    localStorage.setItem("jwtlogin", JSON.stringify({ user: user, token }));
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

export const signUpUser = async (userData) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/auth/signup`,
      userData
    );
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

export const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("jwtlogin"));
  if (typeof window == "undefined") {
    return false;
  }
  if (!localStorage.getItem("jwtlogin")) return false;
  if (user) {
    return user;
  }
  return false;
};

export const logOut = () => {
  localStorage.removeItem("jwtlogin");
  window.location.reload();
};

export const getUsers = async () => {
  try {
    const { data } = await axios.get(`http://localhost:5000/api/auth/users`);
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const deteleUser = async (userId) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/auth/${userId}`
    );
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

export const editUser = async (userId, userObj) => {
  try {
    const { data } = await axios.put(
      `http://localhost:5000/api/auth/${userId}`,
      userObj
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getSingleUser = async (userId) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/auth/${userId}`
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
