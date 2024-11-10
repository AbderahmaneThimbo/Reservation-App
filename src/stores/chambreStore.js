import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./authStore";

export const useChambreStore = defineStore("chambreStore", {
  state: () => ({
    chambres: [],
    chambre: null,
    typesChambres: [],
    chambresDisponibles: [],
    utilisateurs: []
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
    },

    async loadChambreById(id) {
      const authStore = useAuthStore();
      try {
        const response = await axios.get(
          `http://localhost:3000/api/chambres/${id}`,  
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`
            }
          }
        );
        this.chambre = response.data;
        return this.chambre;
      } catch (error) {
        console.error('Erreur lors du chargement de la chambre :', error.message);
        throw error;
      }
    },
    
    async loadChambresDisponibles() {
      const authStore = useAuthStore();
      try {
        const response = await axios.get("http://localhost:3000/api/chambres-disponibles", {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        this.chambresDisponibles = response.data;
      } catch (error) {
        console.error("Erreur lors du chargement des chambres disponibles :", error.message);
        throw error; 
      }
    },
    
    async loadTypesChambres() {
      const authStore = useAuthStore();
      try {
        const response = await axios.get("http://localhost:3000/api/types", {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        this.typesChambres = response.data;
        return this.typesChambres;
      } catch (error) {
        console.error(
          "Erreur lors du chargement des types de chambres :",
          error.message
        );
        throw error;
      }
    },

    async deleteChambre(id) {
      const authStore = useAuthStore();
      try {
       const response = await axios.delete(`http://localhost:3000/api/chambres/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        await this.loadChambres();
        return response;
      } catch (error) {
        if (
          error.response && error.response.data && error.response.data.warning
        ) {
          return error.response;
        } else {
          console.error(
            "Erreur lors de la suppression de la chambre :",
            error.message
          );
          throw error;
        }
       
      }
    },

    async addChambre(newChambre) {
      const authStore = useAuthStore();
      try {
        const response = await axios.post(
          "http://localhost:3000/api/chambres",
          newChambre,
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`
            }
          }
        );
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("L'ajout a échoué.");
        }
       await this.loadChambres();
      } catch (error) {
        console.error(
          "Erreur lors de l'ajout du chambre :",
          error.response?.data || error.message
        );
        throw error;
      }
    },

    async updateChambre(id, updatedChambre) {
      const authStore = useAuthStore();
      try {
         await axios.put(
          `http://localhost:3000/api/chambres/${id}`,
          updatedChambre,
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`
            }
          }
        );
        await this.loadChambres();
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour de la chambre :",
          error.message
        );
        throw error;
      }
    }
  },

  persist: true
});
