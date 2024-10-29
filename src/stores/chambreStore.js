import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./authStore";

export const useChambreStore = defineStore("chambreStore", {
  state: () => ({
    chambres: []
  }),

  actions: {
    async loadChambres() {
      const authStore = useAuthStore();
      try {
        const response = await axios.get("http://localhost:3000/api/chambres", {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        this.chambres = response.data;
        return this.chambres;
      } catch (error) {
        console.error(
          "Erreur lors du chargement des chambres :",
          error.message
        );
        throw error;
      }
    }
  },

  persist: true
});
