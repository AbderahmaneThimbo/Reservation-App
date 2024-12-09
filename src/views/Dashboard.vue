<template>
  <div class="dashboard">
    <nav :class="['sidebar', { collapsed: isSidebarCollapsed, visible: isSidebarVisible }]">
      <ul class="nav flex-column nav-links mt-4">
        <li class="nav-item">
          <router-link to="/dashboard" class="nav-link  mt-4">
            <i class="fas fa-home"></i>
            <span class="link-text" v-if="!isSidebarCollapsed">Dashboard</span>
          </router-link>
        </li>
        <li class="nav-item" v-if="role == 'ADMIN'">
          <router-link to="/dashboard/utilisateurs" class="nav-link" active-class="active">
            <i class="fas fa-users"></i>
            <span class="link-text" v-if="!isSidebarCollapsed">Utilisateurs</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/clients" class="nav-link" active-class="active">
            <i class="fas fa-user-tie"></i>
            <span class="link-text" v-if="!isSidebarCollapsed">Clients</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/chambres" class="nav-link" active-class="active">
            <i class="fas fa-bed"></i>
            <span class="link-text" v-if="!isSidebarCollapsed">Chambres</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/reservations" class="nav-link" active-class="active">
            <i class="fas fa-calendar-check"></i>
            <span class="link-text" v-if="!isSidebarCollapsed">Réservations</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/types-chambres" class="nav-link" active-class="active">
            <i class="fas fa-door-open"></i>
            <span class="link-text" v-if="!isSidebarCollapsed">Types de chambres</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="`/dashboard/profil/${id}`" class="nav-link" active-class="active">
            <i class="fa-solid fa-user"></i>
            <span class="link-text" v-if="!isSidebarCollapsed">Profil</span>
          </router-link>
        </li>
        <button class="btn btn-outline-light  toggle-btn" @click="toggleSidebar">
          <i :class="isSidebarCollapsed ? 'fas fa-angle-right' : 'fas fa-angle-left'"></i>
        </button>
      </ul>
    </nav>

    <div class="top-bar">
      <div class="company-info">
        <div class="sidebar-header" @click="toggleSidebarVisibility">
          <i class="fas fa-bars"></i>
        </div>
      </div>
      <div class="user-info">
        <i class="fa-solid fa-circle-user user-icon"></i>
        <div class="user-name">
          <h5>{{ authStore.user?.nom }}</h5>
          <i class="fas fa-sign-out-alt logout-icon" @click="logout" title="Déconnexion"></i>
        </div>
      </div>
    </div>
    <div :class="['content', { expanded: isSidebarCollapsed }]">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const authStore = useAuthStore();
const role = authStore.user.role
console.log(authStore.user);


const id = authStore.user.id
console.log(id);

const router = useRouter();

const isSidebarCollapsed = ref(false);
const isSidebarVisible = ref(false);

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const toggleSidebarVisibility = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};

const logout = async () => {
  const result = await Swal.fire({
    title: 'Confirmer la déconnexion',
    text: 'Voulez-vous vraiment vous déconnecter ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, déconnecter',
    cancelButtonText: 'Annuler'
  });

  if (result.isConfirmed) {
    authStore.logout();
    localStorage.removeItem('token');
    router.push('/');
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
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  overflow: hidden;
  transition: width 0.3s ease, transform 0.3s ease;
}

.sidebar.collapsed {
  width: 80px;
}

.sidebar-header {
  display: none;
  align-items: center;
  margin-bottom: 30px;
  cursor: pointer;
}

.toggle-btn {
  margin-top: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px;
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

.link-text {
  display: inline-block;
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
  transition: left 0.3s ease, width 0.3s ease;
}

.sidebar.collapsed+.top-bar {
  width: calc(100% - 80px);
  left: 80px;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-icon {
  font-size: 40px;
  color: #1abc9c;
  margin-right: 15px;
}

.user-name h5 {
  font-size: 18px;
  margin: 0;
}

.user-name {
  display: flex;
  align-items: center;
}

.logout-icon {
  font-size: 18px;
  color: #e74c3c;
  margin-left: 10px;
  cursor: pointer;
}

.logout-icon:hover {
  color: #c0392b;
}

.content {
  flex-grow: 1;
  padding: 80px 20px 20px;
  background-color: #ecf0f1;
  margin-left: 250px;
  width: calc(100% - 250px);
  transition: margin-left 0.3s ease, width 0.3s ease;
}

.content.expanded {
  margin-left: 80px;
  width: calc(100% - 80px);
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 1000;
  }

  .sidebar.visible {
    transform: translateX(0);
  }

  .sidebar-header {
    display: flex;

  }

  .top-bar {
    width: 100%;
    left: 0;
    padding: 10px;
  }

  .content {
    margin-left: 0;
    width: 100%;
  }

  .sidebar.collapsed {
    width: 80px;
  }

  .sidebar.visible {
    transform: translateX(0);
  }

  .sidebar-header {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    cursor: pointer;
  }

  .sidebar.collapsed+.top-bar {
    width: calc(100% - 80px);
    left: 80px;
  }

  .user-icon {
    font-size: 30px;
    margin-right: 10px;
  }

  .user-name h5 {
    font-size: 16px;
  }

  .logout-icon {
    font-size: 16px;
    margin-left: 5px;
  }
}

@media (max-width: 480px) {
  .top-bar {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
  }

  .user-info {
    justify-content: space-between;
    width: 100%;
  }

  .user-icon {
    font-size: 25px;
    margin-right: 8px;
  }

  .user-name h5 {
    font-size: 14px;
  }

  .logout-icon {
    font-size: 14px;
    margin-left: 5px;
  }
}
</style>
