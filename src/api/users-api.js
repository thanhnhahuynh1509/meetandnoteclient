import axios from "axios";
import { API_URL, getConfig } from "./common-api";
const USER = "/api/users";

export const getUserByToken = async (token) => {
  const response = await axios.post(
    API_URL + USER + "/get-by-token",
    token,
    getConfig()
  );

  return response.data;
};
