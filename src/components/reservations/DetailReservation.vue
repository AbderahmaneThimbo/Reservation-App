<template>
    <div class="container mt-5">
        <router-link to="/dashboard/reservations" class="btn btn-secondary mb-3">
            <i class="fas fa-arrow-left"></i>
        </router-link>
        <h2 class="text-center mb-4">Détails de la Réservation</h2>

        <div v-if="reservation">
            <div class="row">
                <!-- Client and Chambre Number -->
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="clientName" class="form-label">Client</label>
                        <input type="text" class="form-control" id="clientName" :value="reservation.client.nom"
                            readonly />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="chambreNumber" class="form-label">Numéro de Chambre</label>
                        <input type="text" class="form-control" id="chambreNumber"
                            :value="reservation.chambre.numeroChambre" readonly />
                    </div>
                </div>
            </div>

            <div class="row">
                <!-- Date de début and Date de fin -->
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="dateDebut" class="form-label">Date de début</label>
                        <input type="text" class="form-control" id="dateDebut"
                            :value="formatDate(reservation.dateDebut)" readonly />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="dateFin" class="form-label">Date de fin</label>
                        <input type="text" class="form-control" id="dateFin" :value="formatDate(reservation.dateFin)"
                            readonly />
                    </div>
                </div>
            </div>

            <div class="row">
                <!-- Status and Created By -->
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="status" class="form-label">Statut</label>
                        <input type="text" class="form-control" id="status" :class="statusClass"
                            :value="reservation.status" readonly />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="createdBy" class="form-label">Créé par</label>
                        <input type="text" class="form-control" id="createdBy" :value="reservation.utilisateur.nom"
                            readonly />
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <p>Chargement des détails de la réservation...</p>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useReservationStore } from '@/stores/reservationStore';
import { useToast } from 'vue-toastification';
import moment from 'moment';

const route = useRoute();
const reservationStore = useReservationStore();
const toast = useToast();
const reservation = ref(null);

onMounted(async () => {
    try {
        const reservationId = route.params.id;
        reservation.value = await reservationStore.loadReservationById(reservationId);
    } catch (error) {
        console.error("Erreur lors du chargement de la réservation :", error.message);
        toast.error("Une erreur est survenue lors du chargement des détails de la réservation.");
    }
});

const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY');
};

</script>
<style scoped>
.container {
    max-width: 800px;
    background-color: white;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.form-label {
    font-weight: bold;
}

h2 {
    color: #333;
    font-weight: bold;
    margin-bottom: 20px;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
}

.btn-secondary:hover {
    background-color: #5a6268;
}
</style>
