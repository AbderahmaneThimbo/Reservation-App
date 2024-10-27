<template>
    <div class="form-container d-flex align-items-center">
        <!-- Icône à gauche du formulaire -->
        <!-- <div class="icon-container">
            <i class="fas fa-user"></i>
        </div> -->

        <!-- Formulaire à droite de l'icône -->
        <div class="form-content">
            <h2 class="text-center mb-4">Ajouter un utilisateur</h2>
            <form @submit.prevent="addUser" class="p-4 shadow-sm bg-white rounded">
                <div class="form-group mb-3">
                    <label for="name" class="form-label">Nom</label>
                    <input type="text" v-model="name" class="form-control" placeholder="Entrez le nom" required />
                </div>
                <div class="form-group mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" v-model="email" class="form-control" placeholder="Entrez l'adresse email"
                        required />
                </div>
                <div class="form-group mb-4">
                    <label for="role" class="form-label">Rôle</label>
                    <select v-model="role" class="form-control" required>
                        <option value="ADMIN">Admin</option>
                        <option value="USER">Utilisateur</option>
                    </select>
                </div>
                <button type="submit" class="btn w-100 py-2">Ajouter l'utilisateur</button>
            </form>
        </div>
    </div>
</template>

<script setup>

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

/* .icon-container {
    font-size: 100px;
    color: #007bff;
    margin-right: 40px;
} */

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