<template>
    <div class="container mt-5">
        <div class="d-flex justify-content-end mb-3">
            <router-link class="btn btn-success create-client" to="/dashboard/chambres/ajouter">
                <i class="fas fa-plus"></i> Ajouter une chambre
            </router-link>
        </div>
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col" v-for="(chambre, index) in chambres" :key="index">
                <div class="card custom-card">
                    <img :src="chambre.image" class="card-img-top" alt="Image Chambre">
                    <div class="card-body">
                        <h5 class="card-title d-flex justify-content-between">
                            Chambre {{ chambre.numeroChambre }}
                            <span class="d-flex">
                                <i class="fas fa-eye text-success me-3" @click="viewChambre(chambre)"></i>
                                <router-link :to="{ name: 'modifier-chambre', params: { id: chambre.id } }"
                                    class="text-decoration-none">
                                    <i class="fas fa-edit text-primary me-3"></i>
                                </router-link>
                                <i class="fas fa-trash text-danger" @click="removeChambre(chambre.id)"></i>
                            </span>
                        </h5>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="chambreModal" tabindex="-1" aria-labelledby="chambreModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="chambreModalLabel">Détails de la chambre</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="numeroChambre" class="form-label">Numéro de Chambre</label>
                            <input type="text" class="form-control" id="numeroChambre"
                                v-model="selectedChambre.numeroChambre" readonly>
                        </div>
                        <div class="mb-3">
                            <label for="prixChambre" class="form-label">Prix</label>
                            <input type="text" class="form-control" id="prixChambre" v-model="selectedChambre.prix"
                                readonly>
                        </div>
                        <div class="mb-3">
                            <label for="typeChambre" class="form-label">Type</label>
                            <input type="text" class="form-control" id="typeChambre" :value="selectedChambre.type?.nom"
                                readonly>
                        </div>
                        <div class="mb-3">
                            <label for="createdBy" class="form-label">Créé par</label>
                            <input type="text" class="form-control" id="createdBy"
                                :value="selectedChambre.utilisateur?.nom" readonly>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useChambreStore } from '@/stores/chambreStore';
import { Modal } from 'bootstrap';
import { useToast } from 'vue-toastification';

const chambres = ref([]);
const chambreStore = useChambreStore();
const selectedChambre = ref({});
const toast = useToast();

onMounted(async () => {
    try {
        chambres.value = await chambreStore.loadChambres();
    } catch (error) {
        console.error('Erreur lors du chargement des chambres :', error.message);
    }
});

const removeChambre = (id) => {
    const confirmed = confirm("Voulez-vous vraiment supprimer cette chambre ?");
    if (confirmed) {

        chambreStore.deleteChambre(id).then(() => {
            toast.success('Type de chambre supprimé avec succès !');
            chambreStore.loadChambres();
        }).catch(error => {
            console.error('Erreur lors de la suppression :', error.message);
            toast.error('Une erreur est survenue lors de la suppression.');
        });
    }
};

const viewChambre = async (chambre) => {
    selectedChambre.value = chambre;

    await nextTick();
    const chambreModal = new Modal(document.getElementById('chambreModal'));
    chambreModal.show();
};

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

.modal .form-control {
    background-color: #f8f9fa;
}
</style>