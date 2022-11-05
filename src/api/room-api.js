import axios from "axios";
import { API_URL, getConfig } from "./common-api";

const ROOM = "/api/rooms";

export const getRoomByLink = async (link) => {
  const response = await axios.get(
    API_URL + ROOM + "/link/" + link,
    getConfig()
  );
  return response.data;
};

export const getChildrenRoomByLink = async (link) => {
  const response = await axios.get(
    API_URL + ROOM + "/children/" + link,
    getConfig()
  );
  return response.data;
};

export const saveRoom = async (data) => {
  const response = await axios.post(API_URL + ROOM, data, getConfig());
  return response.data;
};

export const updateRoomPosition = async (data) => {
  const response = await axios.put(
    API_URL + ROOM + "/position/" + data.id,
    data,
    getConfig()
  );
  return response.data;
};

export const updateRoomInformation = async (data) => {
  const response = await axios.put(
    API_URL + ROOM + "/information/" + data.id,
    data,
    getConfig()
  );
  return response.data;
};

export const deleteRoom = async (data) => {
  const response = await axios.delete(
    API_URL + ROOM + "/" + data.id,
    getConfig()
  );
  return response.data;
};

export const getLastIDRoom = async () => {
  const response = await axios.get(API_URL + ROOM + "/last-id", getConfig());
  return response.data;
};
