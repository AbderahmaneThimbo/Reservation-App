<template>
    <div class="user-management">
        <loading :active.sync="isLoading" :can-cancel="false" color="#1abc9c"
            background-color="rgba(255, 255, 255, 0.8)" />

        <div class="top-bar">
            <h2>Liste des utilisateurs</h2>
            <router-link class="btn btn-success create-user" to="/dashboard/utilisateurs/ajouter">
                <i class="fas fa-user-plus"></i> Ajouter un utilisateur
            </router-link>
        </div>

        <div class="search-bar d-flex mb-4">
            <input type="text" v-model="searchQuery" class="form-control form-control-lg"
                placeholder="Rechercher par email..." style="max-width: 400px;" />
        </div>

        <table class="user-table">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Rôle</th>
                    <th>Statut</th>
                    <th class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in filteredUsers" :key="user.id">
                    <td>{{ user.nom }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                    <td class="status">
                        <i :class="user.status ? 'fas fa-check-circle active-status' : 'fas fa-ban blocked-status'"
                            :title="user.status ? 'Actif' : 'Bloqué'" @click="toggleUserStatus(user)"></i>
                    </td>

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
import { onMounted, ref, computed } from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { useUserStore } from '@/stores/useUserStore';
import { useToast } from 'vue-toastification';
import Swal from 'sweetalert2';

const userStore = useUserStore();
const toast = useToast();
const users = ref([]);
const searchQuery = ref("");
const isLoading = ref(false);

onMounted(async () => {
    isLoading.value = true;
    try {
        await userStore.loadUserData();
        users.value = userStore.users;
    } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs:", error.message);
        toast.error("Une erreur est survenue lors du chargement des utilisateurs.");
    } finally {
        isLoading.value = false;
    }
});

const filteredUsers = computed(() => {
    if (!searchQuery.value) {
        return users.value;
    }
    return users.value.filter(user =>
        user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
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
        isLoading.value = true;
        try {
            await userStore.removeUser(id);
            toast.success('Utilisateur supprimé avec succès !');
            await userStore.loadUserData();
            users.value = userStore.users;
        } catch (error) {
            console.error("Erreur lors de la suppression:", error.message);
            toast.error('Une erreur est survenue lors de la suppression.');
        } finally {
            isLoading.value = false;
        }
    }
};

const toggleUserStatus = async (user) => {
    try {
        const updatedStatus = !user.status;
        await userStore.updateUser(user.id, {
            nom: user.nom,
            email: user.email,
            role: user.role,
            status: updatedStatus
        });

        user.status = updatedStatus;

        toast.success(
            `Le statut de l'utilisateur ${user.nom} a été mis à jour avec succès !`
        );
    } catch (error) {
        console.error("Erreur lors de la mise à jour du statut :", error.message);
        toast.error("Une erreur est survenue lors de la mise à jour du statut.");
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

.status i {
    font-size: 18px;
    cursor: pointer;
}

.active-status {
    color: #28a745;
}

.blocked-status {
    color: #dc3545;
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

@media (max-width: 768px) {

    .user-management {
        padding: 5px;
    }

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

    .user-table th,
    .user-table td {
        padding: 10px;
        font-size: 14px;
    }

    .action-btn i {
        font-size: 16px;
    }

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
