import axios from "axios";

const intance = axios.create({
    baseURL: "http://localhost:3001/api",
});

export default intance;
