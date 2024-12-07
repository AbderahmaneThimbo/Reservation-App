<template>
    <div class="form-container d-flex align-items-center">
        <div class="form-content">
            <router-link to="/dashboard/clients" class="btn btn-secondary mb-3">
                <i class="fas fa-arrow-left"></i>
            </router-link>
            <form @submit.prevent="updateClient" class="p-4 shadow-sm bg-white rounded">
                <h2 class="text-center mb-4">Modifier le client</h2>

                <div class="form-group mb-3">
                    <label for="nom" class="form-label">Nom</label>
                    <input type="text" v-model="nom" class="form-control" placeholder="Entrez le nom" required />
                    <small v-if="errors.nom" class="text-danger">{{ errors.nom }}</small>
                </div>

                <div class="form-group mb-3">
                    <label for="prenom" class="form-label">Prénom</label>
                    <input type="text" v-model="prenom" class="form-control" placeholder="Entrez le prénom" required />
                    <small v-if="errors.prenom" class="text-danger">{{ errors.prenom }}</small>
                </div>
                <div class="form-group mb-3">
                    <label for="telephone" class="form-label">Téléphone</label>
                    <input type="text" v-model="telephone" class="form-control" placeholder="Entrez le téléphone"
                        required />
                    <small v-if="errors.telephone" class="text-danger">{{ errors.telephone }}</small>
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
const errors = ref({});

onMounted(() => {
    const clientId = route.params.id;
    clientStore.loadClientById(clientId).then(() => {
        nom.value = clientStore.client.nom;
        prenom.value = clientStore.client.prenom;
        telephone.value = clientStore.client.telephone;
    }).catch((error) => {
        toast.error("Erreur lors du chargement du client.");
        console.error("Erreur :", error.message);
    });
});

const updateClient = async () => {
    errors.value = {};
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
        if (error.response && error.response.data && error.response.data.errors) {
            error.response.data.errors.forEach(err => {
                errors.value[err.path] = err.msg;
            });
        } else {
            toast.error('Une erreur est survenue lors de la mise à jour.');
        }
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