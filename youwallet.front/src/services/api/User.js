import axiosClient from "../../axios";

const User = {
  login: async (email, password) => {
    return await axiosClient.post("/login", { email, password });
  },
  register: async (name, email, password) => {
    return await axiosClient.post("/register", { name, email, password });
  },
  logout: async () => {
    return await axiosClient.post("/logout");
  },
  me: async () => {
    return await axiosClient.get("/me");
  },
};
export default User;
