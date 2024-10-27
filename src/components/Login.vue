<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4" style="width: 400px;">
      <h2 class="text-center mb-4">Login</h2>

      <form>
        <div class="form-group mb-3">
          <label for="email">Email</label>
          <input type="email" v-model="email" class="form-control" id="email" placeholder="Entrer votre email"
            required />
        </div>

        <div class="form-group mb-3">
          <label for="password">Mot de passe</label>
          <input type="password" v-model="password" class="form-control" id="password"
            placeholder="Entrer votre mot de passe" required />
        </div>

        <router-link to="/dashboard/utilisateurs" class="btn btn-success w-100">Se connecter</router-link>
      </form>

      <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
