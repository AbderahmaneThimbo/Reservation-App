import axios from "axios";

export const requestPasswordReset = async email => {
  return await axios.post(
    "http://localhost:3000/api/password/forgot-password",
    { email }
  );
};

export const resetPassword = async (token, password) => {
  return await axios.post(
    `http://localhost:3000/api/password/reset-password/${token}`,
    { password }
  );
};
