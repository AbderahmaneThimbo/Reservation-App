<template>
    <div class="form-container">
        <div class="form-content">
            <router-link to="/dashboard/clients" class="btn btn-secondary mb-3">
                <i class="fas fa-arrow-left"></i>
            </router-link>
            <div class="details-container p-4 shadow-sm bg-white rounded">
                <h2 class="text-center mb-4">Détails du client</h2>

                <div class="client-details-grid">
                    <div class="form-group">
                        <label for="nom" class="form-label">Nom</label>
                        <input type="text" v-model="clientStore.client.nom" class="form-control" readonly />
                    </div>
                    <div class="form-group">
                        <label for="prenom" class="form-label">Prénom</label>
                        <input type="text" v-model="clientStore.client.prenom" class="form-control" readonly />
                    </div>
                    <div class="form-group">
                        <label for="telephone" class="form-label">Téléphone</label>
                        <input type="text" v-model="clientStore.client.telephone" class="form-control" readonly />
                    </div>
                    <div class="form-group">
                        <label for="createdBy" class="form-label">Créé par</label>
                        <input type="text" :value="clientStore.client.utilisateur.nom" class="form-control" readonly />
                    </div>
                </div>

                <div class="reservations mt-4">
                    <h3>Réservations</h3>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date de début</th>
                                <th>Date de fin</th>
                                <th>Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(reservation, index) in clientStore.client.reservations" :key="reservation.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ formatDate(reservation.dateDebut) }}</td>
                                <td>{{ formatDate(reservation.dateFin) }}</td>
                                <td>{{ reservation.status }}</td>
                            </tr>
                            <tr v-if="!clientStore.client.reservations.length">
                                <td colspan="4" class="text-center">Aucune réservation trouvée.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>



<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useClientStore } from '@/stores/useClientStore';
import moment from 'moment';

const clientStore = useClientStore();
const route = useRoute();

onMounted(() => {
    const clientId = route.params.id;
    clientStore.loadClientById(clientId);
});
const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY');
};
</script>

<style scoped>
.form-container {
    max-width: 900px;
    margin: 50px auto;
    padding: 20px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
}

.form-content {
    flex: 1;
}

.details-container {
    display: flex;
    flex-direction: column;
}

.client-details-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.form-group {
    margin-bottom: 20px;
}

.form-control {
    padding: 10px 15px;
    border-radius: 5px;
    border: 1px solid #ced4da;
    transition: border-color 0.3s ease;
}

input {
    background-color: #ced4da;
}

.form-control:focus {
    border-color: #007bff;
    box-shadow: none;
}

.table {
    margin-top: 20px;
}

h3 {
    margin-top: 20px;
    font-weight: bold;
}

.btn {
    background-color: #1abc9c;
    color: white;
    font-size: 16px;
    font-weight: 600;
}

.btn:hover {
    background-color: #16a085;
}

.shadow-sm {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.bg-white {
    background-color: white;
}

.rounded {
    border-radius: 8px;
}

.text-center {
    text-align: center;
}
</style>
