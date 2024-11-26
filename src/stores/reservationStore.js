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
            await this.loadReservations();
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
    async downloadReservationReceipt(id) {
      const authStore = useAuthStore();
      try {
        console.log("Téléchargement en cours pour la réservation ID:", id);
        const response = await axios.get(`http://localhost:3000/api/reservations/${id}/recu`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
          responseType: "blob", // Indispensable pour les fichiers binaires
        });
    
        // Vérifiez si le fichier est bien récupéré
        if (!response.data) {
          console.error("Le fichier PDF n'a pas été reçu.");
          return;
        }
    
        
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `recu_reservation_${id}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log("Reçu téléchargé avec succès !");
      } catch (error) {
        console.error("Erreur lors du téléchargement du reçu :", error.message);
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
       await this.loadReservations();
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
