import axios from "axios";
import { API_URL } from "./common-api";

const SIGN_IN = "/sign-in";
const SIGN_UP = "/sign-up";

export const signUp = async (user) => {
  const response = await axios.post(API_URL + SIGN_UP, user);
  return response.data;
};

export const signIn = async (user) => {
  const response = await axios.post(API_URL + SIGN_IN, user);
  return response.data;
};
