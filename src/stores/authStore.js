import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    token: null
  }),

  actions: {
    async login(email, password) {
      try {
        const response = await axios.post("http://localhost:3000/api/login", {
          email,
          password
        });

        this.token = response.data.token;
      } catch (error) {
        console.error("Erreur lors de la connexion :", error.message);
        throw error;
      }
    },

    logout() {
      this.token = null;
    }
  },

  persist: true
});
