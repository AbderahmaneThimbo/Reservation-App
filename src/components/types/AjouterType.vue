<template>
    <div class="form-container d-flex align-items-center">
        <div class="form-content">
            <router-link to="/dashboard/types-chambres" class="btn btn-secondary mb-3">
                <i class="fas fa-arrow-left"></i>
            </router-link>
            <form @submit.prevent="addTypeChambre" class="p-4 shadow-sm bg-white rounded">
                <h2 class="text-center mb-4">Ajouter un type de chambre</h2>

                <!-- Champ Nom du type de chambre -->
                <div class="form-group mb-3">
                    <label for="name" class="form-label">Nom du type de chambre</label>
                    <input type="text" v-model="nom" class="form-control" placeholder="Entrez le nom du type"
                        required />
                    <!-- Affichage de l'erreur pour le champ nom -->
                    <small v-if="errors.nom" class="text-danger">{{ errors.nom }}</small>
                </div>

                <button type="submit" class="btn w-100 py-2">Ajouter le type de chambre</button>
            </form>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { useTypeChambreStore } from '@/stores/typeChambreStore';
import { useToast } from 'vue-toastification';
import { useRouter } from "vue-router";

const toast = useToast();
const router = useRouter();

const nom = ref('');
const errors = ref({}); // Variable réactive pour stocker les erreurs

const typeChambreStore = useTypeChambreStore();

const addTypeChambre = async () => {
    errors.value = {}; // Réinitialiser les erreurs avant chaque soumission
    try {
        await typeChambreStore.addTypeChambre({
            nom: nom.value
        });
        toast.success('Type de chambre ajouté avec succès !');
        router.push("/dashboard/types-chambres");
    } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
            // Stocker les erreurs retournées par l'API
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
