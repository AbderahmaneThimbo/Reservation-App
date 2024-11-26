<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-lg" style="width: 400px; border-radius: 10px;">
      <div class="text-center mb-4">
        <img src="@/assets/logo.png" alt="Logo" class="logo-img" />
      </div>

      <h2 class="text-center mb-4">Se connecter</h2>

      <form @submit.prevent="login">
        <div class="form-group mb-4">
          <label for="email">Email</label>
          <input type="email" v-model="email" class="form-control form-control-lg" id="email"
            placeholder="Entrer votre email" required />
          <small v-if="errors.email" class="text-danger">{{ errors.email }}</small>
        </div>
        <div class="form-group mb-4">
          <label for="password">Mot de passe</label>
          <div class="input-group">
            <input :type="showPassword ? 'text' : 'password'" v-model="password" class="form-control form-control-lg"
              id="password" placeholder="Entrer votre mot de passe" required />
            <div class="input-group-append">
              <span class="input-group-text" @click="showPassword = !showPassword" style="cursor: pointer;">
                <i :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
              </span>
            </div>
          </div>


          <small v-if="errors.password" class="text-danger">{{ errors.password }}</small>

        </div>

        <div class="d-flex justify-content-between mb-3">
          <router-link to="forgot" class="text-primary">Mot de passe oublié ?</router-link>
        </div>

        <button type="submit" class="btn btn-primary btn-lg w-100">Se connecter</button>
      </form>
      <p v-if="errorMessage" class="text-danger mt-3 text-center">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const errorMessage = ref('');
const errors = ref({});
const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const login = async () => {
  errors.value = {};
  errorMessage.value = '';
  try {
    await authStore.login(email.value, password.value);
    toast.success('Connexion avec succès !');
    router.push('/dashboard');
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Erreur lors de la connexion. Veuillez vérifier vos informations.");
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

.logo-img {
  width: 80px;
  height: 80px;
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
