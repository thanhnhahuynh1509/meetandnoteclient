import { API_URL, getConfig } from "./common-api";
import axios from "axios";

const ATTRIBUTE = "/api/attributes";

export const saveAttribbute = async (data) => {
    const response = await axios.post(API_URL + ATTRIBUTE, data, getConfig());
    return response.data;
}
