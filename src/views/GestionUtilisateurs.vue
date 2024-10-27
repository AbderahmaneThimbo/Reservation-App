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
                <tr v-for="(user, index) in filteredUsers" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                    <td class="actions">
                        <router-link :to="`/dashboard/utilisateurs/detail/${user.id}`" class="action-btn">
                            <i class="fas fa-eye"></i>
                        </router-link>
                        <router-link :to="`/dashboard/utilisateurs/modifier/${user.id}`" class="action-btn">
                            <i class="fas fa-edit"></i>
                        </router-link>
                        <button class="action-btn" @click="removeUser(user.id)">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const searchQuery = ref('');
const users = ref([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Agent' },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', role: 'User' },
    { id: 4, name: 'Sara Wilson', email: 'sara@example.com', role: 'Agent' },
]);

const filteredUsers = computed(() => {
    return users.value.filter(user =>
        user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const router = useRouter();

const removeUser = (id) => {
    const confirmed = confirm('Voulez-vous vraiment supprimer cet utilisateur ?');
    if (confirmed) {
        users.value = users.value.filter(user => user.id !== id); // Suppression locale pour tester
    }
};
</script>


<style scoped>
.user-management {
    margin: 0 auto;
    max-width: 1200px;
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
    /* background-color: #1abc9c; */
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
</style>
