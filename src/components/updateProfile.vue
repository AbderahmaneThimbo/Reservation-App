<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="card p-4 shadow-lg" style="width: 500px; border-radius: 10px;">
            <div class="text-center mb-4">
                <i class="fas fa-user-circle user-icon"></i>
            </div>

            <h2 class="text-center mb-4">Modifier le profil</h2>

            <form @submit.prevent="updateProfile">
                <div class="form-group mb-4">
                    <label for="nom">Nom</label>
                    <input type="text" v-model="user.nom" class="form-control form-control-lg" id="nom"
                        placeholder="Entrer votre nom" required />
                </div>

                <div class="form-group mb-4">
                    <label for="email">Email</label>
                    <input type="email" v-model="user.email" class="form-control form-control-lg" id="email"
                        placeholder="Entrer votre email" required />
                </div>

                <div class="form-group mb-4">
                    <label for="currentPassword">Mot de passe actuel</label>
                    <input type="password" v-model="currentPassword" class="form-control form-control-lg"
                        id="currentPassword" placeholder="Entrer votre mot de passe actuel" />
                </div>

                <div class="form-group mb-4">
                    <label for="newPassword">Nouveau mot de passe</label>
                    <input type="password" v-model="newPassword" class="form-control form-control-lg" id="newPassword"
                        placeholder="Entrer votre nouveau mot de passe" />
                </div>

                <button type="submit" class="btn btn-primary btn-lg w-100">Mettre à jour le profil</button>
            </form>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from '@/stores/useUserStore';
import { useToast } from "vue-toastification";

const authStore = useAuthStore();
const userStore = useUserStore();
const toast = useToast();

const user = ref({});
const userId = authStore.user.id;
const currentPassword = ref("");
const newPassword = ref("");
onMounted(async () => {
    await userStore.loadUserById(userId)
    user.value = userStore.user
    console.log("user", user.value);
});


const updateProfile = async () => {
    try {
        const payload = {
            nom: user.value.nom,
            email: user.value.email,
        };

        if (currentPassword.value && newPassword.value) {
            payload.currentPassword = currentPassword.value;
            payload.newPassword = newPassword.value;
        }

        await authStore.updateProfile(payload);

        toast.success("Profil mis à jour avec succès !");

        currentPassword.value = "";
        newPassword.value = "";
    } catch (error) {
        console.error("Erreur lors de la mise à jour du profil :", error);

        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error("Une erreur est survenue lors de la mise à jour.");
        }
    }
};
</script>




<style scoped>
.card {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    background-color: #fff;
    padding: 30px;
}

.user-icon {
    font-size: 80px;
    color: #16a085;
    margin-bottom: 15px;
}

.form-group label {
    font-weight: bold;
    color: #333;
}

.form-control-lg {
    font-size: 1.2rem;
    padding: 12px;
}

.btn-primary {
    background-color: #1abc9c;
    border-color: #1abc9c;
}

.btn-primary:hover {
    background-color: #16a085;
    border-color: #16a085;
}
</style>