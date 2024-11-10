<template>
    <div class="user-management">
        <div class="top-bar">
            <h2>Liste des utilisateurs</h2>
            <router-link class="btn btn-success create-user" to="/dashboard/utilisateurs/ajouter">
                <i class="fas fa-user-plus"></i> Ajouter un utilisateur
            </router-link>
        </div>

        <table class="user-table">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Rôle</th>
                    <th class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="user.id">
                    <td>{{ user.nom }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                    <td class="actions">
                        <router-link :to="`/dashboard/utilisateurs/detail/${user.id}`" class="action-btn">
                            <i class="fas fa-eye"></i>
                        </router-link>
                        <router-link :to="`/dashboard/utilisateurs/modifier/${user.id}`" class="action-btn">
                            <i class="fas fa-edit"></i>
                        </router-link>
                        <button class="action-btn" @click="confirmRemoveUser(user.id)">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/useUserStore';
import { useToast } from 'vue-toastification';
import Swal from 'sweetalert2';


const userStore = useUserStore();
const toast = useToast();
const users = ref([]);

onMounted(async () => {
    try {
        await userStore.loadUserData();
        users.value = userStore.users;
    } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs:", error.message);
        toast.error("Une erreur est survenue lors du chargement des utilisateurs.");
    }
});

const confirmRemoveUser = async (id) => {
    const result = await Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Voulez-vous vraiment supprimer cet utilisateur ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Annuler'
    });
    if (result.isConfirmed) {
        try {
            await userStore.removeUser(id);
            toast.success('Utilisateur supprimé avec succès !');
            await userStore.loadUserData();
            users.value = userStore.users;
        } catch (error) {
            console.error("Erreur lors de la suppression:", error.message);
            toast.error('Une erreur est survenue lors de la suppression.');
        }
    }
};



</script>



<style scoped>
.user-management {
    margin: 0 auto;
    max-width: 1200px;
    padding: 10px;
}

.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    margin-top: 100px;
}

h2 {
    font-size: 24px;
    color: #4a4a4a;
}

.create-user {
    color: white;
    border-radius: 5px;
    padding: 10px 15px;
    text-decoration: none;
    display: flex;
    align-items: center;
}

.create-user i {
    margin-right: 8px;
}

.user-table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.user-table th,
.user-table td {
    padding: 15px 20px;
    text-align: left;
}

.user-table th {
    background-color: #f9f9f9;
    color: #666;
    font-weight: bold;
}

.user-table td {
    border-bottom: 1px solid #e3e3e3;
    color: #333;
}

.user-table tbody tr:hover {
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

/* Media Queries pour rendre la page responsive */
@media (max-width: 768px) {

    /* Réduire la taille du conteneur et ajuster les marges */
    .user-management {
        padding: 5px;
    }

    /* Empiler les éléments de la top-bar verticalement sur mobile */
    .top-bar {
        flex-direction: column;
        align-items: flex-start;
    }

    h2 {
        font-size: 20px;
        margin-bottom: 10px;
    }

    .create-user {
        padding: 8px 12px;
        font-size: 14px;
    }


    .user-table th:nth-child(2),
    .user-table td:nth-child(2) {
        display: none;
    }

    /* Réduire les marges et tailles des éléments de la table */
    .user-table th,
    .user-table td {
        padding: 10px;
        font-size: 14px;
    }

    /* Réduire la taille des icônes d'action sur mobile */
    .action-btn i {
        font-size: 16px;
    }

    /* Assurer un bon alignement des actions */
    .actions {
        display: flex;
        justify-content: center;
    }
}

@media (max-width: 480px) {

    .user-management {
        padding: 5px;
    }

    h2 {
        font-size: 18px;
    }

    .create-user {
        font-size: 12px;
    }

    .user-table th,
    .user-table td {
        font-size: 12px;
        padding: 8px;
    }

    .action-btn i {
        font-size: 14px;
    }
}
</style>
