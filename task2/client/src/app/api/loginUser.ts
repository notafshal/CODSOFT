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
      return result.data; // Return the entire user data object, including token
    }
  } catch (err) {
    console.error(err);
    throw err; // Rethrow the error for handling in the calling function
  }
};
export default loginUser;
