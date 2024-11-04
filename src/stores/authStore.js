import { defineStore } from "pinia";
import axios from "axios";
import {
  requestPasswordReset,
  resetPassword
} from "../../src/components/api/auth";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    token: null,
    user: null,
    emailMessage: ""
  }),

  actions: {
    async login(email, password) {
      try {
        const response = await axios.post("http://localhost:3000/api/login", {
          email,
          password
        });

        this.token = response.data.token;

        const userResponse = await axios.get("http://localhost:3000/api/me", {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });

        this.user = userResponse.data.user;
      } catch (error) {
        console.error("Erreur lors de la connexion :", error.message);
        throw error;
      }
    },
    async forgotPassword(email) {
      try {
        const response = await requestPasswordReset(email);
        this.emailMessage = response.data.message;
      } catch (error) {
        console.error("Error during password reset request:", error);
        throw error;
      }
    },
    async resetPassword(token, password) {
      try {
        const response = await resetPassword(token, password);
        return response.data.message;
      } catch (error) {
        console.error("Error during password reset:", error);
        throw error;
      }
    },

    logout() {
      this.token = null;
      this.user = null;
    }
  },

  persist: true
});
