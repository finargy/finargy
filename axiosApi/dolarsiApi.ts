import axios from "axios";

const dolarsiApi = axios.create({
  baseURL: "https://www.dolarsi.com/api/api.php",
});

export default dolarsiApi;
