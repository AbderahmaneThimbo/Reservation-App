<template>
    <div class="container-fluid d-flex justify-content-center align-items-center content-wrapper">
        <div class="container">
            <div class="container mt-3 mb-4 d-flex justify-content-end">
                <router-link class="btn btn-success create-user" to="/dashboard/types/ajouter">
                    <i class="fas fa-user-plus"></i> Ajouter un type de chambre
                </router-link>
            </div>

            <div class="row containt-categorie justify-content-center">
                <div v-if="typeStore.typeChambres.length > 0"
                    class="col-12 col-sm-6 mb-4 col-md-4 col-lg-3 containt-card"
                    v-for="(typeChambre, index) in typeStore.typeChambres" :key="index">
                    <div class="card p-1" style="width: 100%" @click="redirectToDetail(typeChambre.id)">
                        <h5 class="card-title text-center fw-bold mt-4 mb-4">
                            {{ typeChambre.nom }}
                        </h5>

                        <div class="card-body d-flex justify-content-between align-items-center">
                            <router-link :to="`/dashboard/types/modifier/${typeChambre.id}`" class="action-btn"
                                @click.stop>
                                <i class="fas fa-edit"></i>
                            </router-link>

                            <button class="btn btn-sm btn-danger float-end"
                                @click.stop="removeTypeChambre(typeChambre.id)">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div v-else class="container">
                    <h1 class="fw-bold text-center mt-5 text-danger">
                        Aucun Type de Chambre trouvé
                    </h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useTypeChambreStore } from '@/stores/typeChambreStore';
import { useToast } from 'vue-toastification';

const typeStore = useTypeChambreStore();
const toast = useToast();
const router = useRouter();

onMounted(() => {
    typeStore.loadTypeChambres();
});

const redirectToDetail = (typeChambreId) => {
    router.push(`/dashboard/types/detail/${typeChambreId}`);
};

const removeTypeChambre = (id) => {
    const confirmed = confirm('Voulez-vous vraiment supprimer ce type de chambre ?');
    if (confirmed) {
        typeStore.removeTypeChambre(id).then(() => {
            toast.success('Type de chambre supprimé avec succès !');
            typeStore.loadTypeChambres();
        }).catch(error => {
            console.error("Erreur lors de la suppression:", error.message);
            toast.error('Une erreur est survenue lors de la suppression.');
        });
    }
};
</script>


<style scoped>
.content-wrapper {
    min-height: 40vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.containt-card {
    transition: transform 0.3s, box-shadow 0.3s;
}

.containt-card:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}
</style>
