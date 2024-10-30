<template>
    <div class="reservation-form-container">
        <h2>Ajouter une réservation</h2>
        <form @submit.prevent="submitReservation">

            <div class="mb-3">
                <label for="client" class="form-label">Client</label>
                <select v-model="newReservation.clientId" class="form-select" required>
                    <option disabled value="">Sélectionnez un client</option>
                    <option v-for="client in clients" :key="client.id" :value="client.id">
                        {{ client.nom }}
                    </option>
                </select>
            </div>

            <div class="mb-3">
                <label for="chambre" class="form-label">Chambre</label>
                <select v-model="newReservation.chambreId" class="form-select" required>
                    <option disabled value="">Sélectionnez une chambre</option>
                    <option v-for="chambre in chambres" :key="chambre.id" :value="chambre.id">
                        Chambre {{ chambre.numeroChambre }} - {{ chambre.prix }} €
                    </option>
                </select>
            </div>

            <div class="mb-3">
                <label for="dateDebut" class="form-label">Date de début</label>
                <input type="date" v-model="newReservation.dateDebut" class="form-control" required />
            </div>
            <div class="mb-3">
                <label for="dateFin" class="form-label">Date de fin</label>
                <input type="date" v-model="newReservation.dateFin" class="form-control" required />
            </div>
            <div class=" mb-3">
                <label for="status" class="form-label">Statut</label>
                <select v-model="newReservation.status" class="form-control" required>
                    <option value="EN_ATTENTE">EN_ATTENTE</option>
                    <option value="CONFIRMEE">CONFIRMEE</option>
                </select>
            </div>

            <button type="submit" class="btn btn-primary">Ajouter la réservation</button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useReservationStore } from '@/stores/reservationStore';
import { useRoute, useRouter } from 'vue-router';
import { useChambreStore } from '../../stores/chambreStore.js';
import { useClientStore } from '../../stores/useClientStore.js';
import { useToast } from 'vue-toastification';
import moment from 'moment';

const reservationStore = useReservationStore();
const router = useRouter();
const chambreStore = useChambreStore();
const clientStore = useClientStore();
const toast = useToast();

const newReservation = ref({
    clientId: '',
    chambreId: '',
    dateDebut: '',
    dateFin: '',
    status: ''
});

const clients = ref([]);
const chambres = ref([]);

onMounted(async () => {
    try {
        clients.value = await clientStore.loadClientData();
        chambres.value = await chambreStore.loadChambres();
    } catch (error) {
        console.error("Erreur lors du chargement des données :", error.message);
    }
});

const submitReservation = async () => {
    try {
        await reservationStore.addReservation({
            clientId: newReservation.value.clientId,
            chambreId: newReservation.value.chambreId,
            dateDebut: moment(newReservation.value.dateDebut).toISOString(),
            dateFin: moment(newReservation.value.dateFin).toISOString(),
            status: newReservation.value.status
        });
        toast.success("Réservation ajoutée avec succès !");
        newReservation.value = {
            clientId: '',
            chambreId: '',
            dateDebut: '',
            dateFin: '',
            status: ''
        };
        router.push('/dashboard/reservations');
    } catch (error) {
        console.error("Erreur lors de l'ajout de la réservation :", error.message);
        toast.error("Une erreur est survenue lors de l'ajout.");
    }
};
</script>

<style scoped>
.reservation-form-container {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.form-label {
    font-weight: bold;
}

.btn-primary {
    background-color: #1abc9c;
    border: none;
}

.btn-primary:hover {
    background-color: #16a085;
}
</style>