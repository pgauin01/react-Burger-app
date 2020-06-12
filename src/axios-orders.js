import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-80813.firebaseio.com/",
});

export default instance;
