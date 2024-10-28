<template>
    <div class="form-container d-flex align-items-center" v-if="clientStore.client && clientStore.client.nom">
        <div class="form-content">
            <h2 class="text-center mb-4">Détails du client</h2>
            <form class="p-4 shadow-sm bg-white rounded">
                <div class="form-group mb-3">
                    <label for="nom" class="form-label">Nom</label>
                    <input type="text" v-model="clientStore.client.nom" class="form-control" readonly />
                </div>
                <div class="form-group mb-3">
                    <label for="prenom" class="form-label">Prénom</label>
                    <input type="text" v-model="clientStore.client.prenom" class="form-control" readonly />
                </div>
                <div class="form-group mb-4">
                    <label for="telephone" class="form-label">Téléphone</label>
                    <input type="text" v-model="clientStore.client.telephone" class="form-control" readonly />
                </div>
            </form>
        </div>
    </div>
    <p v-else>Chargement des détails du client...</p>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useClientStore } from '@/stores/useClientStore'; // Importer le store client

const clientStore = useClientStore();
const route = useRoute();

onMounted(() => {
    const clientId = route.params.id;
    clientStore.loadClientById(clientId); // Charger les détails du client depuis le store
});
</script>

<style scoped>
.form-container {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.form-content {
    flex: 1;
}

.form-control {
    padding: 10px 15px;
    border-radius: 5px;
    border: 1px solid #ced4da;
    transition: border-color 0.3s ease;
}

.form-control:focus {
    border-color: #007bff;
    box-shadow: none;
}

.btn {
    background-color: #1abc9c;
    color: white;
    font-size: 16px;
    font-weight: 600;
}

.btn:hover {
    background-color: #1abc9c;
}

h2 {
    color: #343a40;
    font-weight: bold;
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
</style>