import { ROOT_URL } from "../config/constants";
import axios from "axios";

export const getCows =async ()=> {
  return axios.get(`${ROOT_URL}/cows`);
}