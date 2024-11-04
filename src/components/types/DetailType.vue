<template>
    <div class="container my-5">
        <router-link to="/dashboard/types-chambres" class="btn btn-secondary mb-3">
            <i class="fas fa-arrow-left"></i>
        </router-link>
        <h2 v-if="typeChambre" class="text-center mb-4">Chambres pour le type: {{ typeChambre.nom }}</h2>

        <div v-if="chambres.length > 0" class="row">
            <div class="col-md-4" v-for="chambre in chambres" :key="chambre.id">
                <div class="card shadow-sm mb-4">
                    <div class="card-body">
                        <h5 class="card-title">Chambre {{ chambre.numeroChambre }}</h5>
                        <p class="card-text">Prix: {{ chambre.prix }} €</p>
                        <p class="card-text">Autres informations...</p>
                        <button class="btn btn-primary w-100 mt-3">
                            Voir les détails
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="text-center mt-5">
            <p class="text-danger fw-bold">Aucune chambre trouvée pour ce type.</p>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useTypeChambreStore } from '@/stores/typeChambreStore';

const route = useRoute();
const chambres = ref([]);
const typeChambre = ref(null);  // Initialise `typeChambre` à null par défaut
const typeChambreStore = useTypeChambreStore();

onMounted(async () => {
    const typeChambreId = route.params.id;
    try {
        chambres.value = await typeChambreStore.loadChambresByType(typeChambreId);
        typeChambre.value = await typeChambreStore.loadTypeChambreById(typeChambreId);
    } catch (error) {
        console.error("Erreur lors du chargement des chambres ou du type de chambre :", error.message);
    }
});
</script>

<style scoped>
/* Ajoute des styles pour rendre les cartes plus attrayantes */
.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.container {
    max-width: 1200px;
}

.text-center {
    font-weight: 600;
}

.card-title {
    font-size: 1.2rem;
}

.btn-primary {
    background-color: #2f6690;
    border: none;
}

.btn-primary:hover {
    background-color: #225170;
}
</style>