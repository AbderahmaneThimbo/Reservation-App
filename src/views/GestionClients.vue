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
import { onMounted } from 'vue';
import { useClientStore } from '@/stores/useClientStore';
import { useToast } from 'vue-toastification';

const clientStore = useClientStore();
const toast = useToast();

onMounted(() => {
    clientStore.loadClientData();
});

const confirmRemoveClient = (id) => {
    const confirmed = confirm('Voulez-vous vraiment supprimer ce client ?');
    if (confirmed) {
        clientStore.removeClient(id).then(() => {
            toast.success('Client supprimé avec succès !');
            clientStore.loadClientData();
        }).catch(error => {
            console.error("Erreur lors de la suppression:", error.message);
            toast.error('Une erreur est survenue lors de la suppression.');
        });
    }
};
const clients = clientStore.clients; 
</script>

<style scoped>
.client-management {
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
</style>
