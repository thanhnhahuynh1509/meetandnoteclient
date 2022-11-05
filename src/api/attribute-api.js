import { API_URL, getConfig } from "./common-api";
import axios from "axios";

const ATTRIBUTE = "/api/attributes";

export const saveAttribbute = async (data) => {
  const response = await axios.post(API_URL + ATTRIBUTE, data, getConfig());
  return response.data;
};

export const getAttributeByComponentID = async (id) => {
  const response = await axios.get(
    API_URL + ATTRIBUTE + "/components/" + id,
    getConfig()
  );
  return response.data;
};
