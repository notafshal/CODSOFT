import axios from "axios";

interface RegisterationUser {
  username: string;
  email: string;
  password: string;
}
const registerUser = (userData: RegisterationUser) => {
  axios
    .post(`http://localhost:5000/api/users/register`, userData)
    .then((result) => {
      if (result.status == 200) {
        console.log(result);
      }
    })
    .catch((err) => {
      if (err.response && err.response.data) {
        throw new Error(err.response.data.message || "Registration failed");
      } else {
        throw new Error("An unknown error occurred");
      }
    });
};

export default registerUser;
