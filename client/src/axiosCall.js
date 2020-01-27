import axios from "axios";

export const axiosProjectCall = () => {
  return axios.create({
    baseURL: "http://localhost:4000/api/projects"
  });
};
