<template>
    <div class="container mt-5 form-container shadow-sm bg-white rounded">
        <div class="">
            <router-link to="/dashboard/chambres" class="btn btn-secondary mb-3">
                <i class="fas fa-arrow-left"></i>
            </router-link>
        </div>
        <h2 class="text-center mb-4">Modifier la chambre</h2>
        <form @submit.prevent="submitModifications" class="p-4">
            <div class="mb-3">
                <label for="numeroChambre" class="form-label">Numéro de Chambre</label>
                <input type="number" v-model.number="chambre.numeroChambre" class="form-control" id="numeroChambre"
                    required />
            </div>

            <div class="mb-3">
                <label for="prixChambre" class="form-label">Prix</label>
                <input type="number" v-model.number="chambre.prix" class="form-control" id="prixChambre" required />
            </div>

            <div class="mb-3">
                <label for="typeChambre" class="form-label">Type de Chambre</label>
                <select v-model="chambre.typeId" class="form-select" id="typeChambre" required>
                    <option disabled value="">Sélectionnez un type de chambre</option>
                    <option v-for="type in typesChambres" :key="type.id" :value="type.id">
                        {{ type.nom }}
                    </option>
                </select>
            </div>

            <div class="d-grid gap-2">
                <button type="submit" class="btn">Modifier la chambre</button>
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
const toast = useToast();
const route = useRoute();
const router = useRouter();

const chambre = ref({
    numeroChambre: '',
    prix: '',
    typeId: ''
});

const typesChambres = ref([]);

onMounted(async () => {
    try {
        const chambreId = route.params.id;
        chambre.value = await chambreStore.loadChambreById(chambreId);
        typesChambres.value = await chambreStore.loadTypesChambres();
    } catch (error) {
        console.error('Erreur lors du chargement de la chambre :', error.message);
        toast.error('Erreur lors du chargement de la chambre.');
    }
});


const submitModifications = async () => {
    try {
        const chambreId = route.params.id;
        await chambreStore.updateChambre(chambreId, {
            numeroChambre: Number(chambre.value.numeroChambre),
            prix: Number(chambre.value.prix),
            typeId: chambre.value.typeId
        });
        toast.success('Chambre modifiée avec succès !');
        router.push('/dashboard/chambres');
    } catch (error) {
        console.error('Erreur lors de la modification de la chambre :', error.message);
        toast.error('Erreur lors de la modification de la chambre.');
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