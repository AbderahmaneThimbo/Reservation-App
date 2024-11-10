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
                    <td>
                        <select v-model="reservation.status"
                            :class="{ 'status-pending': reservation.status === 'EN_ATTENTE', 'status-confirmed': reservation.status === 'CONFIRMEE' }"
                            @change="updateStatus(reservation)">
                            <option value="CONFIRMEE">Confirmé</option>
                            <option value="EN_ATTENTE">En attente</option>
                        </select>
                    </td>

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
import { onMounted, ref } from 'vue';
import { useReservationStore } from '@/stores/reservationStore';
import { useToast } from 'vue-toastification';
import Swal from 'sweetalert2';

const reservationStore = useReservationStore();
const toast = useToast();
const reservations = ref([]);

onMounted(async () => {
    try {
        await reservationStore.loadReservations();
        reservations.value = reservationStore.reservations;
    } catch (error) {
        console.error("Erreur lors du chargement des réservations :", error.message);
        toast.error("Une erreur est survenue lors du chargement des réservations.");
    }
});

const updateStatus = async (reservation) => {
    try {
        await reservationStore.updateReservation(reservation.id, { status: reservation.status });
        toast.success("Statut mis à jour avec succès !");
    } catch (error) {
        console.error("Erreur lors de la mise à jour du statut :", error.message);
        toast.error("Une erreur est survenue lors de la mise à jour du statut.");
    }
};

const confirmRemoveReservation = async (id) => {
    const result = await Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Voulez-vous vraiment supprimer cette réservation ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Annuler'
    });
    if (result.isConfirmed) {
        try {
            await reservationStore.removeReservation(id);
            toast.success('Réservation supprimée avec succès !');
            await reservationStore.loadReservations();
            reservations.value = reservationStore.reservations;
        } catch (error) {
            console.error("Erreur lors de la suppression :", error.message);
            toast.error('Une erreur est survenue lors de la suppression.');
        }
    }
};
</script>



<style scoped>
.reservation-management {
    margin: 0 auto;
    max-width: 1200px;
    padding: 10px;
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

.create-client {
    color: white;
    border-radius: 5px;
    padding: 10px 15px;
    text-decoration: none;
    display: flex;
    align-items: center;
}

.create-client i {
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

.status-pending {
    background-color: #ffe08a;
    color: #856404;
}

.status-confirmed {
    background-color: #a8e6cf;
    color: #2f855a;
}

select {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    font-size: 1em;
    appearance: none;
    cursor: pointer;
}

@media (max-width: 768px) {
    .reservation-management {
        padding: 10px;
    }

    .top-bar {
        flex-direction: column;
        margin-top: 20px;
        align-items: flex-start;
    }

    h2 {
        font-size: 20px;
        margin-bottom: 10px;
    }

    .create-client {
        padding: 8px 12px;
        font-size: 14px;
    }

    .reservation-table th:nth-child(4),
    .reservation-table td:nth-child(4) {
        display: none;
    }

    .actions {
        display: flex;
        justify-content: center;
        font-size: 14px;
    }

    .action-btn i {
        font-size: 16px;
    }

    .reservation-table th,
    .reservation-table td {
        padding: 10px;
        font-size: 14px;
    }
}
</style>