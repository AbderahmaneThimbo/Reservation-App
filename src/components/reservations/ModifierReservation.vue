<template>
    <div class="container mt-5">
        <h2>Modifier la Réservation</h2>

        <form @submit.prevent="submitReservation">
            <!-- Sélection du client -->
            <div class="mb-3">
                <label for="client" class="form-label">Client</label>
                <select v-model="updatedReservation.clientId" class="form-select" required>
                    <option disabled value="">Sélectionnez un client</option>
                    <option v-for="client in clients" :key="client.id" :value="client.id">
                        {{ client.nom }}
                    </option>
                </select>
            </div>

            <div class="mb-3">
                <label for="chambre" class="form-label">Chambre</label>
                <select v-model="updatedReservation.chambreId" class="form-select" required>
                    <option disabled value="">Sélectionnez une chambre</option>
                    <option v-for="chambre in chambresDisponibles" :key="chambre.id" :value="chambre.id">
                        Chambre {{ chambre.numeroChambre }} - {{ chambre.prix }} €
                    </option>
                </select>
            </div>

            <div class="mb-3">
                <label for="dateDebut" class="form-label">Date de début</label>
                <input type="date" v-model="updatedReservation.dateDebut" class="form-control" required />
            </div>

            <div class="mb-3">
                <label for="dateFin" class="form-label">Date de fin</label>
                <input type="date" v-model="updatedReservation.dateFin" class="form-control" required />
            </div>


            <div class="mb-3">
                <label for="status" class="form-label">Statut</label>
                <select v-model="updatedReservation.status" class="form-select" required>
                    <option disabled value="">Sélectionnez un statut</option>
                    <option value="EN_ATTENTE">En attente</option>
                    <option value="CONFIRMEE">Confirmée</option>
                </select>
            </div>

            <button type="submit" class="btn btn-primary">Mettre à jour la réservation</button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useReservationStore } from '@/stores/reservationStore';
import { useChambreStore } from '@/stores/chambreStore';
import { useClientStore } from '@/stores/useClientStore';
import { useToast } from 'vue-toastification';
import moment from 'moment';

const route = useRoute();
const router = useRouter();
const reservationStore = useReservationStore();
const chambreStore = useChambreStore();
const clientStore = useClientStore();
const toast = useToast();


const clients = ref([]);
const chambresDisponibles = ref([]);
const updatedReservation = ref({
    clientId: '',
    chambreId: '',
    dateDebut: '',
    dateFin: '',
    status: ''
});

onMounted(async () => {
    try {
        const reservationId = route.params.id;
        const reservation = await reservationStore.loadReservationById(reservationId);

        updatedReservation.value = {
            clientId: reservation.clientId,
            chambreId: reservation.chambreId,
            dateDebut: moment(reservation.dateDebut).format('YYYY-MM-DD'),
            dateFin: moment(reservation.dateFin).format('YYYY-MM-DD'),
            status: reservation.status
        };

        clients.value = await clientStore.loadClientData();
        chambresDisponibles.value = await chambreStore.loadChambres();
    } catch (error) {
        console.error("Erreur lors du chargement des données :", error.message);
        toast.error("Une erreur est survenue lors du chargement des données.");
    }
});

const submitReservation = async () => {
    try {
        const reservationId = route.params.id;
        await reservationStore.updateReservation(reservationId, {
            clientId: updatedReservation.value.clientId,
            chambreId: updatedReservation.value.chambreId,
            dateDebut: moment(updatedReservation.value.dateDebut).toISOString(),
            dateFin: moment(updatedReservation.value.dateFin).toISOString(),
            status: updatedReservation.value.status
        });
        toast.success("Réservation mise à jour avec succès !");
        router.push('/dashboard/reservations');
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la réservation :", error.message);
        toast.error("Une erreur est survenue lors de la mise à jour.");
    }
};
</script>


<style scoped>
.container {
    max-width: 800px;
    margin: 50px auto;
    background-color: white;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
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

.btn-primary {
    background-color: #1abc9c;
    border: none;
}

.btn-primary:hover {
    background-color: #16a085;
}
</style>