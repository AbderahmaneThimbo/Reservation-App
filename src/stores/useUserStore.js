import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: [], // Liste des utilisateurs
    user: null // Utilisateur sélectionné pour modification ou visualisation
  }),

  actions: {
    // Charger la liste des utilisateurs
    async loadUserData() {
      try {
        const response = await axios.get("http://127.0.0.1:3000/utilisateurs"); // Change cette URL si nécessaire
        this.users = response.data;
      } catch (error) {
        console.error(
          "Erreur lors du chargement des utilisateurs :",
          error.message
        );
      }
    },

    // Supprimer un utilisateur
    async removeUser(id) {
      try {
        await axios.delete(`http://127.0.0.1:3000/utilisateurs/${id}`);
        this.loadUserData(); // Recharger la liste après suppression
      } catch (error) {
        console.error(
          "Erreur lors de la suppression de l'utilisateur :",
          error.message
        );
      }
    },

    // Sélectionner un utilisateur
    getUser(user) {
      this.user = user;
    }
  }
});
