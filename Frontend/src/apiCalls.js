import axios from "axios";
import api from "./utils/api"; //for logged in user calls

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      userCredential
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.userData });
    console.log("login response: ", res.data);
    return res.data;
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

export const register = async (userData) => {
  try {
    return await api.post(
      "http://localhost:5000/api/auth/createuser",
      userData
    );
  } catch (err) {
    console.log(err);
  }
};

export const getAllSpecialists = async (dispatch) => {
  dispatch({ type: "GET_USERS_START" });
  try {
    const res = await axios.get("http://localhost:5000/api/users/specialists");
    dispatch({ type: "GET_USERS", payload: res });
  } catch (err) {
    dispatch({ type: "GET_USERS_FAILED", payload: err });
  }
};

export const getSpecialistsByName = async (searchText, dispatch) => {
  dispatch({ type: "GET_USERS_START" });
  try {
    const res = await axios.post(
      "http://localhost:5000/api/users/searchSpecialistByName",
      { search_text: searchText }
    );
    dispatch({ type: "GET_USERS", payload: res });
  } catch (err) {
    console.error(err, "res");
    dispatch({ type: "GET_USERS_FAILED", payload: err });
  }
};

export const updateProfile = async (userData, dispatch) => {
  try {
    const res = await api.post(
      "http://localhost:5000/api/auth/update",
      userData
    );
    dispatch({ type: "UPDATE_USER", payload: res.data });
    return true;
  } catch (err) {
    console.error(err, "res");
    return false;
  }
};
