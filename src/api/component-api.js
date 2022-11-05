import axios from "axios";
import { API_URL, getConfig } from "./common-api";

const COMPONENT = "/api/components";

export const getComponentByLink = async (link) => {
  const response = await axios.get(
    API_URL + COMPONENT + "/link/" + link,
    getConfig()
  );
  return response.data;
};

export const getComponentByLinkNotTrash = async (link) => {
  const response = await axios.get(
    API_URL + COMPONENT + "/link-not-trash/" + link,
    getConfig()
  );
  return response.data;
};

export const getComponentByLinkTrash = async (link) => {
  const response = await axios.get(
    API_URL + COMPONENT + "/link-trash/" + link,
    getConfig()
  );
  return response.data;
};

export const saveComponent = async (data) => {
  const response = await axios.post(API_URL + COMPONENT, data, getConfig());
  return response.data;
};

export const updateComponentPosition = async (data) => {
  const response = await axios.put(
    API_URL + COMPONENT + "/position/" + data.id,
    data,
    getConfig()
  );
  return response.data;
};

// export const updateComponentInformation = async (data) => {
//   const response = await axios.put(
//     API_URL + COMPONENT + "/information/" + data.id,
//     data,
//     getConfig()
//   );
//   return response.data;
// };

export const trashComponent = async (data) => {
  const response = await axios.put(
    API_URL + COMPONENT + "/trash/" + data.id,
    {},
    getConfig()
  );
  return response.data;
};

export const reTrashComponent = async (data) => {
  const response = await axios.put(
    API_URL + COMPONENT + "/re-trash/" + data.id,
    {},
    getConfig()
  );
  return response.data;
};

export const deleteComponent = async (data) => {
  const response = await axios.delete(
    API_URL + COMPONENT + "/" + data.id,
    getConfig()
  );
  return response.data;
};

export const getLastIDComponent = async (data) => {
  const response = await axios.get(
    API_URL + COMPONENT + "/last-id",
    getConfig()
  );
  return response.data;
};
