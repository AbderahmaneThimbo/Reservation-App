<template>
    <div class="reservation-management">
        <div class="top-bar">
            <h2>Liste des réservations</h2>
            <router-link class="btn btn-success create-client" to="/dashboard/reservations/ajouter">
                <i class="fas fa-plus"></i> Ajouter une réservation
            </router-link>
        </div>

        <table class="reservation-table">
            <thead>
                <tr>
                    <th>Chambre</th>
                    <th>Client</th>
                    <th>Date de début</th>
                    <th>Date de fin</th>
                    <th>Status</th>
                    <th class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(reservation, index) in reservations" :key="reservation.id">
                    <td v-if="reservation.chambre">{{ reservation.chambre.numeroChambre }}</td>
                    <td>{{ reservation.client?.nom }}</td>
                    <td>{{ new Date(reservation.dateDebut).toLocaleDateString() }}</td>
                    <td>{{ new Date(reservation.dateFin).toLocaleDateString() }}</td>
                    <td>{{ reservation.status }}</td>
                    <td class="actions">
                        <router-link :to="`/dashboard/reservations/detail/${reservation.id}`" class="action-btn">
                            <i class="fas fa-eye"></i>
                        </router-link>
                        <router-link :to="`/dashboard/reservations/modifier/${reservation.id}`" class="action-btn">
                            <i class="fas fa-edit"></i>
                        </router-link>
                        <button class="action-btn" @click="confirmRemoveReservation(reservation.id)">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useReservationStore } from '@/stores/reservationStore';
import { useToast } from 'vue-toastification';

const reservationStore = useReservationStore();
const toast = useToast();

onMounted(() => {
    reservationStore.loadReservations();
});

const confirmRemoveReservation = (id) => {
    const confirmed = confirm('Voulez-vous vraiment supprimer cette réservation ?');
    if (confirmed) {
        reservationStore.removeReservation(id).then(() => {
            toast.success('Réservation supprimée avec succès !');
            reservationStore.loadReservations();
        }).catch(error => {
            console.error("Erreur lors de la suppression:", error.message);
        });
    }
};

const reservations = reservationStore.reservations;
</script>


<style scoped>
.reservation-management {
    margin: 0 auto;
    max-width: 1200px;
}

.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    margin-top: 100px;
}

h2 {
    font-size: 24px;
    color: #4a4a4a;
}

.create-reservation {
    color: white;
    border-radius: 5px;
    padding: 10px 15px;
    text-decoration: none;
    display: flex;
    align-items: center;
}

.create-reservation i {
    margin-right: 8px;
}

.reservation-table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.reservation-table th,
.reservation-table td {
    padding: 15px 20px;
    text-align: left;
}

.reservation-table th {
    background-color: #f9f9f9;
    color: #666;
    font-weight: bold;
}

.reservation-table td {
    border-bottom: 1px solid #e3e3e3;
    color: #333;
}

.reservation-table tbody tr:hover {
    background-color: #f1f1f1;
}

.actions {
    text-align: center;
}

.action-btn {
    background-color: transparent;
    border: none;
    margin-right: 10px;
    cursor: pointer;
}

.action-btn i {
    color: #6c757d;
    font-size: 18px;
}
</style>