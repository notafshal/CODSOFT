import axios from "axios";

interface LoginData {
  username: string;
  password: string;
}

const loginUser = async (userData: LoginData) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  try {
    const result = await axios.post(
      `http://localhost:5000/api/auth/login`,
      userData
    );
    if (result.status === 200) {
      return result.data;
    }
  } catch (err: any) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message || "Login failed");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
export default loginUser;
