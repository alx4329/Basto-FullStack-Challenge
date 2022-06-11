import { ROOT_URL } from "../config/constants";
import axios from "axios";

export const getCows =async ()=> {
  return axios.get(`${ROOT_URL}/cows`);
}

export const addCow = async ({cow,edit}) => {
  if(edit){
    return axios.put(`${ROOT_URL}/cows`, cow);
  }
  const newCow=await axios.post(`${ROOT_URL}/cows`, cow);
  return newCow.data
}

export const deleteCow = async (id) => {
  return axios.delete(`${ROOT_URL}/cows/${id}`);
}