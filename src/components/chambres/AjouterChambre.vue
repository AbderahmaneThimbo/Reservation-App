<template>
    <div class="container mt-5 form-container shadow-sm bg-white rounded">
        <div class="">
            <router-link to="/dashboard/chambres" class="btn btn-secondary mb-3">
                <i class="fas fa-arrow-left"></i>
            </router-link>
        </div>
        <h2 class="text-center mb-4">Ajouter une chambre</h2>
        <form @submit.prevent="submitChambre" class="p-4">

            <div class="mb-3">
                <label for="numeroChambre" class="form-label">Numéro de Chambre</label>
                <input type="number" v-model.number="newChambre.numeroChambre" class="form-control" id="numeroChambre"
                    placeholder="Entrez le numéro de la chambre" required />
                <small v-if="errors.numeroChambre" class="text-danger">{{ errors.numeroChambre }}</small>
            </div>
            <div class="mb-3">
                <label for="prixChambre" class="form-label">Prix</label>
                <input type="number" v-model="newChambre.prix" class="form-control" id="prixChambre"
                    placeholder="Entrez le prix de la chambre" required />
                <small v-if="errors.prix" class="text-danger">{{ errors.prix }}</small>
            </div>

            <div class="mb-3">
                <label for="typeChambre" class="form-label">Type de Chambre</label>
                <select v-model="newChambre.typeId" class="form-select" id="typeChambre" required>
                    <option disabled value="">Sélectionnez un type de chambre</option>
                    <option v-for="type in typesChambres" :key="type.id" :value="type.id">
                        {{ type.nom }}
                    </option>
                </select>
                <small v-if="errors.typeId" class="text-danger">{{ errors.typeId }}</small>
            </div>

            <div class="d-grid gap-2">
                <button type="submit" class="btn">Ajouter la chambre</button>
            </div>
        </form>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useChambreStore } from '@/stores/chambreStore';
import { useToast } from 'vue-toastification';

const chambreStore = useChambreStore();
const router = useRouter();
const route = useRoute();
const toast = useToast();

const newChambre = ref({
    numeroChambre: '',
    prix: '',
    typeId: ''
});
const errors = ref({});

const typesChambres = ref([]);

onMounted(async () => {
    try {
        typesChambres.value = await chambreStore.loadTypesChambres();
    } catch (error) {
        console.error('Erreur lors du chargement des types de chambres :', error.message);
    }
});

const submitChambre = async () => {
    errors.value = {};
    try {
        await chambreStore.addChambre({
            numeroChambre: Number(newChambre.value.numeroChambre),
            prix: Number(newChambre.value.prix),
            typeId: newChambre.value.typeId
        });
        toast.success('Chambre ajoutée avec succès !');
        newChambre.value = {
            numeroChambre: '',
            prix: '',
            typeId: ''
        };
        router.push('/dashboard/chambres');
    } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
            error.response.data.errors.forEach(err => {
                errors.value[err.path] = err.msg;
            });
        } else {
            toast.error('Erreur lors de l\'ajout de la chambre.');
        }
    }
};
</script>


<style scoped>
.form-container {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    background-color: white;
    border-radius: 12px;
}

.form-control {
    padding: 10px 15px;
    border-radius: 6px;
    border: 1px solid #ced4da;
    transition: border-color 0.3s ease;
}

.form-control:focus {
    border-color: #1abc9c;
    box-shadow: none;
}

.form-label {
    font-weight: 600;
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
    border-radius: 12px;
}

.d-grid {
    display: grid;
}
</style>