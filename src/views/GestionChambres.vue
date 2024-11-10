<template>
    <div class="chambre-management">
        <div class="top-bar">
            <h2>Liste des chambres</h2>
            <router-link class="btn btn-success create-chambre" to="/dashboard/chambres/ajouter">
                <i class="fas fa-plus"></i> Ajouter une chambre
            </router-link>
        </div>

        <table class="chambre-table">
            <thead>
                <tr>
                    <th>Numéro de Chambre</th>
                    <th>Prix</th>
                    <th>Type</th>
                    <th class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(chambre, index) in chambres" :key="chambre.id">
                    <td>{{ chambre.numeroChambre }}</td>
                    <td>{{ chambre.prix }} mru</td>
                    <td>{{ chambre.type?.nom }}</td>
                    <td class="actions">
                        <button class="action-btn" @click="viewChambre(chambre)">
                            <i class="fas fa-eye"></i>
                        </button>
                        <router-link :to="{ name: 'modifier-chambre', params: { id: chambre.id } }" class="action-btn">
                            <i class="fas fa-edit"></i>
                        </router-link>
                        <button class="action-btn" @click="removeChambre(chambre.id)">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
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
                        <input type="text" class="form-control" v-model="selectedChambre.numeroChambre" readonly />
                    </div>
                    <div class="mb-3">
                        <label for="prixChambre" class="form-label">Prix</label>
                        <input type="text" class="form-control" v-model="selectedChambre.prix" readonly />
                    </div>
                    <div class="mb-3">
                        <label for="typeChambre" class="form-label">Type</label>
                        <input type="text" class="form-control" :value="selectedChambre.type?.nom" readonly />
                    </div>
                    <div class="mb-3">
                        <label for="createdBy" class="form-label">Créé par</label>
                        <input type="text" class="form-control" :value="selectedChambre.utilisateur?.nom" readonly />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
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
import Swal from 'sweetalert2';

const chambres = ref([]);
const chambreStore = useChambreStore();
const selectedChambre = ref({});
const toast = useToast();

onMounted(async () => {
    try {
        chambres.value = await chambreStore.loadChambres();
    } catch (error) {
        console.error('Erreur lors du chargement des chambres :', error.message);
        toast.error('Une erreur est survenue lors du chargement des chambres.');
    }
});

const removeChambre = async (id) => {
    const result = await Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Voulez-vous vraiment supprimer cette chambre ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Annuler'
    });

    if (result.isConfirmed) {
        try {
            const response = await chambreStore.deleteChambre(id);
            if (response && response.data.warning) {
                toast.warning(response.data.message)
            } else {
                toast.success('Chambre supprimée avec succès !');
                chambres.value = await chambreStore.loadChambres();
            }
        } catch (error) {
            toast.error('Une erreur est survenue lors de la suppression.');
            console.error('Erreur lors de la suppression :', error.message);
        }
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
.chambre-management {
    margin: 0 auto;
    max-width: 1200px;
    padding: 10px;
}

.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    margin-top: 50px;
}

h2 {
    font-size: 24px;
    color: #4a4a4a;
}

.create-chambre {
    color: white;
    border-radius: 5px;
    padding: 10px 15px;
    text-decoration: none;
    display: flex;
    align-items: center;
}

.create-chambre i {
    margin-right: 8px;
}

.chambre-table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.chambre-table th,
.chambre-table td {
    padding: 15px 20px;
    text-align: left;
}

.chambre-table th {
    background-color: #f9f9f9;
    color: #666;
    font-weight: bold;
}

.chambre-table td {
    border-bottom: 1px solid #e3e3e3;
    color: #333;
}

.chambre-table tbody tr:hover {
    background-color: #f1f1f1;
}

.actions {
    text-align: center;
}

.action-btn {
    background-color: transparent;
    border: none;
    margin-right: 10px;
    cursor: pointer;
}

.action-btn i {
    color: #6c757d;
    font-size: 18px;
}
</style>
