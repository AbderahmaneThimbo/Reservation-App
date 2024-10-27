<template>
  <div class="dashboard">
    <nav class="sidebar">
      <div class="sidebar-header">
        <i class="fas fa-bars"></i>
        <h5>Your Company</h5>
      </div>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/dashboard" class="nav-link" active-class="active">
            <i class="fas fa-home"></i> Dashboard
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/utilisateurs" class="nav-link" active-class="active">
            <i class="fas fa-users"></i> Utilisateurs
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/clients" class="nav-link" active-class="active">
            <i class="fas fa-user-tie"></i> Clients
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/chambres" class="nav-link" active-class="active">
            <i class="fas fa-bed"></i> Chambres
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/reservations" class="nav-link" active-class="active">
            <i class="fas fa-calendar-check"></i> Réservations
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/types-chambres" class="nav-link" active-class="active">
            <i class="fas fa-door-open"></i> Types de chambres
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Top bar -->
    <div class="top-bar">
      <div class="company-info">
        <h2>Dashboard</h2>
      </div>
      <div class="user-info">
        <i class="fas fa-bell"></i>
        <i class="fas fa-envelope"></i>
        <img src="https://via.placeholder.com/40" alt="User" class="user-img">
        <div>
          <h5>Thimbo</h5>
          <small>Administrateur</small>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>


<script>
export default {
  name: 'Dashboard',
  mounted() {
  }
};
</script>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: black;
  color: white;
  padding: 20px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.sidebar-header i {
  margin-right: 10px;
  font-size: 20px;
}

.nav-link {
  color: #bdc3c7;
  text-decoration: none;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.nav-link i {
  margin-right: 10px;
}

.nav-link.active {
  background-color: #1abc9c;
  color: white;
  border-radius: 5px;
  padding: 10px;
}

.top-bar {
  width: calc(100% - 250px);
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 250px;
  z-index: 1000;
}

.content {
  flex-grow: 1;
  padding: 80px 20px 20px;
  background-color: #ecf0f1;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-info i {
  margin-right: 15px;
  font-size: 20px;
  color: #2C3E50;
}

.user-img {
  border-radius: 50%;
  margin-right: 10px;
}
</style>
