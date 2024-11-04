<template>
    <div class="form-container d-flex align-items-center">
        <div class="form-content">
            <router-link to="/dashboard/utilisateurs" class="btn btn-secondary mb-3">
                <i class="fas fa-arrow-left"></i>
            </router-link>
            <h2 class="text-center mb-4">Ajouter un utilisateur</h2>
            <form @submit.prevent="addUser" class="p-4 shadow-sm bg-white rounded">
                <div class="form-group mb-3">
                    <label for="name" class="form-label">Nom</label>
                    <input type="text" v-model="nom" class="form-control" placeholder="Entrez le nom" required />
                </div>
                <div class="form-group mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" v-model="email" class="form-control" placeholder="Entrez l'adresse email"
                        required />
                </div>
                <div class="form-group mb-4">
                    <label for="role" class="form-label">Rôle</label>
                    <select v-model="role" class="form-control" required>
                        <option value="ADMIN">ADMIN</option>
                        <option value="GESTIONNAIRE">GESTIONNAIRE</option>
                    </select>
                </div>
                <div class="form-group mb-3">
                    <label for="password" class="form-label">Mot de passe</label>
                    <input type="password" v-model="password" class="form-control" placeholder="Entrez le mot de passe"
                        required />
                </div>

                <button type="submit" class="btn w-100 py-2">Ajouter l'utilisateur</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/useUserStore';
import { useToast } from 'vue-toastification';
import { useRouter } from "vue-router";

const toast = useToast();
const route = useRouter();

const nom = ref('');
const email = ref('');
const password = ref('');
const role = ref('GESTIONNAIRE');

const userStore = useUserStore();

const addUser = async () => {
    try {
        await userStore.addUser({
            nom: nom.value,
            email: email.value,
            role: role.value,
            password: password.value
        });
        toast.success('Utilisateur ajouté avec succès !');
        route.push("/dashboard/utilisateurs");
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur :", error.message);
        toast.error('Une erreur est survenue lors de l\'ajout.');
    }
};

</script>

<style scoped>
.form-container {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.form-content {
    flex: 1;
}

.form-control {
    padding: 10px 15px;
    border-radius: 5px;
    border: 1px solid #ced4da;
    transition: border-color 0.3s ease;
}

.form-control:focus {
    border-color: #007bff;
    box-shadow: none;
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
    border-radius: 8px;
}
</style>
