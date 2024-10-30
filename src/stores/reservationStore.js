import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./authStore";

export const useReservationStore = defineStore("reservationStore", {
  state: () => ({
    reservations: [],
    chambres: [],
    clients: []
  }),

  actions: {
    async loadReservations() {
      const authStore = useAuthStore();
      try {
        const response = await axios.get(
          "http://localhost:3000/api/reservations",
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`
            }
          }
        );
        this.reservations = response.data;
        return this.reservations;
      } catch (error) {
        console.error(
          "Erreur lors du chargement des réservations :",
          error.message
        );
        throw error;
      }
    },
    
    async loadReservationById(id) {
      const authStore = useAuthStore();
      try {
        const response = await axios.get(
          `http://localhost:3000/api/reservations/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`
            }
          }
        );
        this.reservation = response.data;
        return this.reservation;
      } catch (error) {
        console.error(
          "Erreur lors du chargement de la réservation :",
          error.message
        );
        throw error;
      }
    },
      
      async addReservation(newReservation) {
          const authStore = useAuthStore();
          try {
            const response = await axios.post(
                "http://localhost:3000/api/reservations",
                newReservation,
                {
                  headers: {
                    Authorization: `Bearer ${authStore.token}`
                  }
                }
              );
              if (response.status !== 200 && response.status !== 201) {
                throw new Error("L'ajout a échoué.");
              }
              this.loadReservations();
          } catch (error) {
            console.error(
                "Erreur lors de l'ajout du chambre :",
                error.response?.data || error.message
              );
              throw error;
          }
    },
      
    async updateReservation(id, updatedReservation) {
      const authStore = useAuthStore();
      try {
        await axios.put(`http://localhost:3000/api/reservations/${id}`, updatedReservation, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        await this.loadReservations();
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la réservation :", error.message);
        throw error;
      }
    },

    async removeReservation(id) {
      const authStore = useAuthStore();
      try {
        await axios.delete(`http://localhost:3000/api/reservations/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        this.loadReservations();
      } catch (error) {
        console.error(
          "Erreur lors de la suppression de la réservation :",
          error.message
        );
        throw error;
      }
    }
  },

  persist: true
});
