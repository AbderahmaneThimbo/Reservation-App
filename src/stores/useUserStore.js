import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: [],
    user: {
      nom: "",
      email: "",
      role: ""
    }
  }),

  actions: {
    async loadUserData() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/utilisateurs"
        );
        this.users = response.data;
      } catch (error) {
        console.error(
          "Erreur lors du chargement des utilisateurs :",
          error.message
        );
      }
    },
    async loadUserById(id) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/utilisateurs/${id}`
        );
        const userData = response.data;
        this.user = {
          nom: userData.nom,
          email: userData.email,
          role: userData.role
        };
        console.log("Données utilisateur récupérées:", this.user);
      } catch (error) {
        console.error(
          "Erreur lors du chargement de l'utilisateur :",
          error.message
        );
      }
    },
    async addUser(newUser) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/utilisateurs",
          newUser
        );
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("L'ajout a échoué.");
        }
        this.loadUserData();
      } catch (error) {
        console.error(
          "Erreur lors de l'ajout de l'utilisateur :",
          error.response?.data || error.message
        );
        throw error;
      }
    },    

    async updateUser(id, updatedUser) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/utilisateurs/${id}`,
          updatedUser
        );

        if (response.status !== 200) {
          throw new Error("La mise à jour a échoué.");
        }

        this.loadUserData();
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour de l'utilisateur :",
          error.message
        );
        throw error;
      }
    },

    async removeUser(id) {
      try {
        await axios.delete(`http://localhost:3000/api/utilisateurs/${id}`);
        this.loadUserData();
      } catch (error) {
        console.error(
          "Erreur lors de la suppression de l'utilisateur :",
          error.message
        );
      }
    }
  },

  persist: true
});
