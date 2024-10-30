<template>
    <div class="container mt-5">
        <h2>Détails de la Réservation</h2>
        <div v-if="reservation">
            <div class="mb-3">
                <label for="clientName" class="form-label">Client</label>
                <input type="text" class="form-control" id="clientName" :value="reservation.client.nom" readonly />
            </div>

            <div class="mb-3">
                <label for="chambreNumber" class="form-label">Numéro de Chambre</label>
                <input type="text" class="form-control" id="chambreNumber" :value="reservation.chambre.numeroChambre"
                    readonly />
            </div>

            <div class="mb-3">
                <label for="dateDebut" class="form-label">Date de début</label>
                <input type="text" class="form-control" id="dateDebut" :value="formatDate(reservation.dateDebut)"
                    readonly />
            </div>

            <div class="mb-3">
                <label for="dateFin" class="form-label">Date de fin</label>
                <input type="text" class="form-control" id="dateFin" :value="formatDate(reservation.dateFin)"
                    readonly />
            </div>

            <div class="mb-3">
                <label for="status" class="form-label">Statut</label>
                <input type="text" class="form-control" id="status" :class="statusClass" :value="reservation.status"
                    readonly />
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
    max-width: 600px;
    margin: 50px auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
    color: #333;
    font-weight: bold;
    margin-bottom: 20px;
}

.form-label {
    font-weight: bold;
}

.form-control {
    background-color: #f8f9fa;
}




.btn {
    background-color: #1abc9c;
    color: white;
}

.btn:hover {
    background-color: #16a085;
}
</style>
