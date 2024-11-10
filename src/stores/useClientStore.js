import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./authStore";

export const useClientStore = defineStore("clientStore", {
  state: () => ({
    clients: [],
    client: {
      nom: "",
      prenom: "",
      telephone: ""
    }
  }),

  actions: {
    async loadClientData() {
      const authStore = useAuthStore();
      try {
        const response = await axios.get("http://localhost:3000/api/clients", {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        this.clients = response.data;
        return this.clients;
      } catch (error) {
        console.error("Erreur lors du chargement des clients :", error.message);
        throw error;
      }
    },
    async loadClientById(id) {
      const authStore = useAuthStore();
      try {
        const response = await axios.get(
          `http://localhost:3000/api/clients/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`
            }
          }
        );
        this.client = response.data;
      } catch (error) {
        console.error("Erreur lors du chargement du client :", error.message);
      }
    },
    async addClient(newClient) {
      const authStore = useAuthStore();
      try {
        const response = await axios.post(
          "http://localhost:3000/api/clients",
          newClient,
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`
            }
          }
        );
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("L'ajout a échoué.");
        }
        await this.loadClientData();
      } catch (error) {
        console.error("Erreur lors de l'ajout du client :", error.message);
        throw error;
      }
    },
    async updateClient(id, updatedClient) {
      const authStore = useAuthStore();
      try {
        await axios.put(
          `http://localhost:3000/api/clients/${id}`,
          updatedClient,
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`
            }
          }
        );
        await this.loadClientData();
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour du client :",
          error.message
        );
        throw error;
      }
    },
    async removeClient(id) {
      const authStore = useAuthStore();
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/clients/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`
            }
          }
        );
        await this.loadClientData();
        return response;
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.warning
        ) {
          return error.response;
        } else {
          console.error(
            "Erreur lors de la suppression du client :",
            error.message
          );
          throw error;
        }
      }
    }
  },

  persist: true
});
