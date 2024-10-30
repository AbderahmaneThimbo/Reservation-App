import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from './authStore'; 

export const useTypeChambreStore = defineStore("typeChambreStore", {
  state: () => ({
    typeChambres: [],
    typeChambre: {
      nom: "",
      utilisateurId: null,
    },
    chambres: []
  }),

  actions: {
    async loadTypeChambres() {
      const authStore = useAuthStore(); 
      try {
        const response = await axios.get("http://localhost:3000/api/types", {
          headers: {
            Authorization: `Bearer ${authStore.token}` 
          }
        });
        this.typeChambres = response.data;
      } catch (error) {
        console.error(
          "Erreur lors du chargement des types de chambres :",
          error.message
        );
      }
    },
    async loadTypeChambreById(id) {
      const authStore = useAuthStore(); 
      try {
        const response = await axios.get(`http://localhost:3000/api/types/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}` 
          }
        });
        this.typeChambre = response.data;
        // return this.typeChambre;  
      } catch (error) {
        console.error('Erreur lors du chargement du type de chambre :', error.message);
        throw error;
      }
    },
    
    async addTypeChambre(newTypeChambre) {
      const authStore = useAuthStore();
      try {
        const response = await axios.post(
          "http://localhost:3000/api/types",
          newTypeChambre,
          {
            headers: {
              Authorization: `Bearer ${authStore.token}` 
            }
          }
        );
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("L'ajout a échoué.");
        }
        this.loadTypeChambres();
      } catch (error) {
        console.error(
          "Erreur lors de l'ajout du type de chambre :",
          error.response?.data || error.message
        );
        throw error;
      }
    },

    async removeTypeChambre(id) {
      const authStore = useAuthStore();
      try {
        await axios.delete(`http://localhost:3000/api/types/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}` 
          }
        });
        this.loadTypeChambres();
      } catch (error) {
        console.error(
          "Erreur lors de la suppression du type de chambre :",
          error.message
          );
          throw error;
      }
    },

    async updateTypeChambre(id, updatedTypeChambre) {
      const authStore = useAuthStore();
      try {
        const response = await axios.put(
          `http://localhost:3000/api/types/${id}`,
          updatedTypeChambre,
          {
            headers: {
              Authorization: `Bearer ${authStore.token}` 
            }
          }
        );
        if (response.status !== 200) {
          throw new Error("La mise à jour a échoué.");
        }
        this.loadTypeChambres();
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour du type de chambre :",
          error.message
        );
        throw error;
      }
    },
    async loadChambresByType(typeChambreId) {
      const authStore = useAuthStore(); 
      try {
        const response = await axios.get(`http://localhost:3000/api/types/${typeChambreId}/chambres`, {
          headers: {
            Authorization: `Bearer ${authStore.token}` 
          }
        });
        this.chambres = response.data; 
        return this.chambres;
      } catch (error) {
        console.error(
          "Erreur lors du chargement des chambres liées au type de chambre :",
          error.message
        );
        throw error;
      }
    }
  },

  persist: true
});
