import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    token: null,
    user: null
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

    logout() {
      this.token = null;
      this.user = null;
    }
  },

  persist: true
});
