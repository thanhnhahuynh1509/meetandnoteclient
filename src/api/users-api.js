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

export const getUsersByRoomId = async (roomId) => {
  const response = await axios.get(
    API_URL + USER + "/rooms/" + roomId,
    getConfig()
  );
  return response.data;
};

export const updateUserImage = async (id, data) => {
  const response = await axios.put(
    API_URL + USER + "/" + id + "/update-image",
    data,
    getConfig()
  );
  return response.data;
};

export const updateUserInfo = async (id, data) => {
  const response = await axios.put(
    API_URL + USER + "/" + id,
    data,
    getConfig()
  );
  return response.data;
};
