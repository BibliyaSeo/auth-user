import axios from "axios";

// export
export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});
