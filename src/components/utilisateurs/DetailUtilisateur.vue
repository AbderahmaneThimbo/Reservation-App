<template>
    <div class="form-container d-flex align-items-center">
        <div class="form-content">
            <h2 class="text-center mb-4">Détails de l'utilisateur</h2>
            <form class="p-4 shadow-sm bg-white rounded">
                <div class="form-group mb-3">
                    <label for="name" class="form-label">Nom</label>
                    <input type="text" v-model="name" class="form-control" readonly />
                </div>
                <div class="form-group mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" v-model="email" class="form-control" readonly />
                </div>
                <div class="form-group mb-4">
                    <label for="role" class="form-label">Rôle</label>
                    <select v-model="role" class="form-control" disabled>
                        <option value="ADMIN">Admin</option>
                        <option value="USER">Utilisateur</option>
                    </select>
                </div>
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

.form-content {
    flex: 1;
}

.form-control {
    padding: 10px 15px;
    border-radius: 5px;
    border: 1px solid #ced4da;
    transition: border-color 0.3s ease;
    background-color: #e9ecef;
    cursor: not-allowed;
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
