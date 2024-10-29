<template>
    <div class="container mt-5">
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col" v-for="(chambre, index) in chambres" :key="index">
                <div class="card custom-card">
                    <img :src="chambre.image" class="card-img-top" alt="Image Chambre">
                    <div class="card-body">
                        <h5 class="card-title">Chambre {{ chambre.numeroChambre }}</h5>
                        <p class="card-text">Prix: {{ chambre.prix }}€</p>
                        <p class="card-text">Type: {{ chambre.type?.nom || 'Non spécifié' }}</p>
                        <p class="card-text">Description: Cette chambre est équipée de tout le nécessaire pour un séjour
                            confortable.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useChambreStore } from '@/stores/chambreStore';

const chambres = ref([]);
const chambreStore = useChambreStore();

onMounted(async () => {
    try {
        chambres.value = await chambreStore.loadChambres();
    } catch (error) {
        console.error('Erreur lors du chargement des chambres :', error.message);
    }
});
</script>

<style scoped>
.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.card-img-top {
    height: 200px;
    object-fit: cover;
}

.card-body {
    text-align: center;
}

.custom-card {
    border-radius: 12px;
    overflow: hidden;
}

h5.card-title {
    font-size: 1.25rem;
    font-weight: 600;
}

p.card-text {
    font-size: 0.9rem;
    color: #555;
}
</style>
