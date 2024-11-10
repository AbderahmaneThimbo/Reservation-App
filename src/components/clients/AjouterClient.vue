<template>
    <div class="form-container d-flex align-items-center">
        <div class="form-content">
            <div class="">
                <router-link to="/dashboard/clients" class="btn btn-secondary mb-3">
                    <i class="fas fa-arrow-left"></i>
                </router-link>
            </div>
            <form @submit.prevent="addClient" class="p-4 shadow-sm bg-white rounded">
                <h2 class="text-center mb-4">Ajouter un client</h2>

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
                    <input type="text" v-model="telephone" class="form-control"
                        placeholder="Entrez le numéro de téléphone" required />
                    <small v-if="errors.telephone" class="text-danger">{{ errors.telephone }}</small>
                </div>
                <button type="submit" class="btn w-100 py-2">Ajouter le client</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useClientStore } from '@/stores/useClientStore';
import { useToast } from 'vue-toastification';
import { useRouter } from "vue-router";

const toast = useToast();
const router = useRouter();

const nom = ref('');
const prenom = ref('');
const telephone = ref('');
const errors = ref({});

const clientStore = useClientStore();

const addClient = async () => {
    errors.value = {};
    try {
        await clientStore.addClient({
            nom: nom.value,
            prenom: prenom.value,
            telephone: telephone.value
        });
        toast.success('Client ajouté avec succès !');
        router.push("/dashboard/clients");
    } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
            error.response.data.errors.forEach(err => {
                errors.value[err.path] = err.msg;
            });
        } else {
            toast.error('Une erreur est survenue lors de l\'ajout.');
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
