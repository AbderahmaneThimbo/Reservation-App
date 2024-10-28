<template>
    <div class="form-container d-flex align-items-center">
        <div class="form-content">
            <h2 class="text-center mb-4">Modifier le client</h2>
            <form @submit.prevent="updateClient" class="p-4 shadow-sm bg-white rounded">
                <div class="form-group mb-3">
                    <label for="nom" class="form-label">Nom</label>
                    <input type="text" v-model="nom" class="form-control" placeholder="Entrez le nom" required />
                </div>
                <div class="form-group mb-3">
                    <label for="prenom" class="form-label">Prénom</label>
                    <input type="text" v-model="prenom" class="form-control" placeholder="Entrez le prénom" required />
                </div>
                <div class="form-group mb-3">
                    <label for="telephone" class="form-label">Téléphone</label>
                    <input type="text" v-model="telephone" class="form-control" placeholder="Entrez le téléphone"
                        required />
                </div>
                <button type="submit" class="btn w-100 py-2">Mettre à jour le client</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useClientStore } from '@/stores/useClientStore';
import { useToast } from 'vue-toastification';

const clientStore = useClientStore();
const route = useRoute();
const router = useRouter();
const toast = useToast();

const nom = ref('');
const prenom = ref('');
const telephone = ref('');

onMounted(() => {
    const clientId = route.params.id;
    clientStore.loadClientById(clientId).then(() => {
        nom.value = clientStore.client.nom;
        prenom.value = clientStore.client.prenom;
        telephone.value = clientStore.client.telephone;
    });
});

const updateClient = async () => {
    try {
        const clientId = route.params.id;
        const updatedClient = {
            nom: nom.value,
            prenom: prenom.value,
            telephone: telephone.value
        };

        await clientStore.updateClient(clientId, updatedClient);
        toast.success('Client mis à jour avec succès !');
        router.push('/dashboard/clients');
    } catch (error) {
        console.error('Erreur lors de la mise à jour du client :', error.message);
        toast.error('Une erreur est survenue lors de la mise à jour.');
    }
};
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