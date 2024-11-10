<template>
    <div class="client-management">
        <div class="top-bar">
            <h2>Liste des clients</h2>
            <router-link class="btn btn-success create-client" to="/dashboard/clients/ajouter">
                <i class="fas fa-user-plus"></i> Ajouter un client
            </router-link>
        </div>

        <table class="client-table">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Téléphone</th>
                    <th class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(client, index) in clients" :key="client.id">
                    <td>{{ client.nom }}</td>
                    <td>{{ client.prenom }}</td>
                    <td>{{ client.telephone }}</td>
                    <td class="actions">
                        <router-link :to="`/dashboard/clients/detail/${client.id}`" class="action-btn">
                            <i class="fas fa-eye"></i>
                        </router-link>
                        <router-link :to="`/dashboard/clients/modifier/${client.id}`" class="action-btn">
                            <i class="fas fa-edit"></i>
                        </router-link>
                        <button class="action-btn" @click="confirmRemoveClient(client.id)">
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
import { useClientStore } from '@/stores/useClientStore';
import { useToast } from 'vue-toastification';
import Swal from 'sweetalert2';

const clientStore = useClientStore();
const toast = useToast();
const clients = ref([]);

onMounted(async () => {
    try {
        await clientStore.loadClientData();
        clients.value = clientStore.clients;
    } catch (error) {
        console.error("Erreur lors du chargement des clients:", error.message);
        toast.error("Une erreur est survenue lors du chargement des clients.");
    }
});

const confirmRemoveClient = async (id) => {
    const result = await Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Voulez-vous vraiment supprimer ce client ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Annuler'
    });
    if (result.isConfirmed) {
        try {
            const response = await clientStore.removeClient(id);
            if (response && response.data.warning) {
                toast.warning(response.data.message);
            } else {
                toast.success('Client supprimé avec succès !');
                await clientStore.loadClientData();
                clients.value = clientStore.clients;
            }
        } catch (error) {
            toast.error("Une erreur est survenue lors de la suppression.");
            console.error("Erreur lors de la suppression:", error.message);
        }
    }
};



</script>

<style scoped>
.client-management {
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

.client-table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.client-table th,
.client-table td {
    padding: 15px 20px;
    text-align: left;
}

.client-table th {
    background-color: #f9f9f9;
    color: #666;
    font-weight: bold;
}

.client-table td {
    border-bottom: 1px solid #e3e3e3;
    color: #333;
}

.client-table tbody tr:hover {
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

@media (max-width: 768px) {

    .client-management {
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

    /* .client-table th:nth-child(2),
    .client-table td:nth-child(2) {
        display: none;
    } */

    .actions {
        display: flex;
        justify-content: center;
        font-size: 14px;
    }

    .action-btn i {
        font-size: 16px;
    }

    .client-table th,
    .client-table td {
        padding: 10px;
        font-size: 14px;
    }
}
</style>
