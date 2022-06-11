import { ROOT_URL } from "../config/constants";
import axios from "axios";

export const getCows =async ()=> {
  return axios.get(`${ROOT_URL}/cows`);
}

export const addCow = async (cow) => {
  const newCow=await axios.post(`${ROOT_URL}/cows`, cow);
  return newCow.data
}