import { API_URL, getConfig } from "./common-api";
import axios from "axios";

const TODO = "/api/todos";

export const saveTodo = async (id, data) => {
  const response = await axios.post(
    API_URL + TODO + "/attributes/" + id,
    data,
    getConfig()
  );
  return response.data;
};

export const getTodoByAttributeId = async (id) => {
  const response = await axios.get(
    API_URL + TODO + "/attributes/" + id,
    getConfig()
  );
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await axios.delete(API_URL + TODO + "/" + id, getConfig());
  return response.data;
};

export const updateTodo = async (data) => {
  const response = await axios.put(
    API_URL + TODO + "/" + data.id,
    data,
    getConfig()
  );
  return response.data;
};
