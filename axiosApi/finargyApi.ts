import axios from "axios";

const finargyApi = axios.create({
  baseURL: "/api",
});

export default finargyApi;
