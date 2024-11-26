<template>
    <div class="reservation-form-container">
        <router-link to="/dashboard/reservations" class="btn btn-secondary mb-3">
            <i class="fas fa-arrow-left"></i>
        </router-link>
        <h2 class="text-center mb-4">Ajouter une réservation</h2>
        <form @submit.prevent="submitReservation">
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="client" class="form-label">Client</label>
                        <select v-model="newReservation.clientId" class="form-select" required>
                            <option disabled value="">Sélectionnez un client</option>
                            <option v-for="client in clients" :key="client.id" :value="client.id">
                                {{ client.nom }}
                            </option>
                        </select>
                        <small v-if="errors.clientId" class="text-danger">{{ errors.clientId }}</small>
                    </div>

                    <div class="mb-3">
                        <label for="dateDebut" class="form-label">Date de début</label>
                        <input type="date" v-model="newReservation.dateDebut" class="form-control" required />
                        <small v-if="errors.dateDebut" class="text-danger">{{ errors.dateDebut }}</small>
                    </div>

                    <div class="mb-3">
                        <label for="status" class="form-label">Statut</label>
                        <select v-model="newReservation.status" class="form-control" required>
                            <option value="EN_ATTENTE">EN ATTENTE</option>
                            <option value="CONFIRMEE">CONFIRMEE</option>
                        </select>
                        <small v-if="errors.status" class="text-danger">{{ errors.status }}</small>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="chambre" class="form-label">Chambre</label>
                        <select v-model="newReservation.chambreId" class="form-select" required>
                            <option v-for="chambre in chambreStore.chambresDisponibles" :key="chambre.id"
                                :value="chambre.id">
                                Chambre {{ chambre.numeroChambre }} - {{ chambre.prix }} mru
                            </option>

                        </select>
                        <small v-if="errors.chambreId" class="text-danger">{{ errors.chambreId }}</small>
                    </div>
                    <div class="mb-3">
                        <label for="dateFin" class="form-label">Date de fin</label>
                        <input type="date" v-model="newReservation.dateFin" class="form-control" required />
                        <small v-if="errors.dateFin" class="text-danger">{{ errors.dateFin }}</small>
                    </div>
                </div>
            </div>
            <button type="submit" class="btn w-100 py-2 btn-primary">Ajouter la réservation</button>
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
const errors = ref({});

onMounted(async () => {
    try {
        clients.value = await clientStore.loadClientData();
        await chambreStore.loadChambresDisponibles();
        chambres.value = chambreStore.chambresDisponibles;
    } catch (error) {
        console.error("Erreur lors du chargement des données :", error.message);
    }
});

const submitReservation = async () => {
    errors.value = {};
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
        if (error.response && error.response.data && error.response.data.errors) {
            error.response.data.errors.forEach(err => {
                errors.value[err.path] = err.msg;
            });
        } else {
            toast.error("Une erreur est survenue lors de l'ajout.");
        }
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

h2 {
    color: #333;
    font-weight: bold;
    margin-bottom: 20px;
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