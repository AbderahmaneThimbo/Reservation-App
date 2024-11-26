import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import GestionUtilisateurs from '@/views/GestionUtilisateurs.vue';
import GestionClients from '@/views/GestionClients.vue';
import GestionChambres from '@/views/GestionChambres.vue';
import GestionReservations from '@/views/GestionReservations.vue';
import GestionTypesChambres from '@/views/GestionTypesChambres.vue';
import AjouterUtilisateur from '@/components/utilisateurs/AjouterUtilisateur.vue';
import ModifierUtilisateur from '@/components/utilisateurs/ModifierUtilisateur.vue';
import DetailUtilisateur from '@/components/utilisateurs/DetailUtilisateur.vue';
import AjouterClient from '@/components/clients/AjouterClient.vue';
import ModifierClient from '@/components/clients/ModifierClient.vue';
import DetailClient from '@/components/clients/DetailClient.vue';
import AjouterType from '@/components/types/AjouterType.vue';
import DetailType from '@/components/types/DetailType.vue';
import ModifierType from '@/components/types/ModifierType.vue';
import AjouterChambre from '@/components/chambres/AjouterChambre.vue';
import ModifierChambre from '@/components/chambres/ModifierChambre.vue';
import AjouterReservation from '@/components/reservations/AjouterReservation.vue';
import ModifierReservation from '@/components/reservations/ModifierReservation.vue';
import DetailReservation from '@/components/reservations/DetailReservation.vue';
import Calandar from '@/views/Calandar.vue';
import ForgetPassword from '@/components/ForgetPassword.vue';
import ResetPassword from '@/components/ResetPassword.vue';
import { useAuthStore } from '@/stores/authStore';
import UpdateProfile from '@/components/updateProfile.vue';
import Recu from '@/components/reservations/Recu.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/forgot',
    name: 'forgot-password',
    component: ForgetPassword,
  },
  {
    path: '/reset-password/:token',
    name: 'reset-password',
    component: ResetPassword,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/dashboard',
        name: 'calandar',
        component: Calandar,
        meta: { requiresAuth: true },
      },
      {
        path: 'utilisateurs',
        name: 'gestion-utilisateurs',
        component: GestionUtilisateurs,
        meta: { requiresAuth: true },
      },
      {
        path: 'clients',
        name: 'gestion-clients',
        component: GestionClients,
        meta: { requiresAuth: true },
      },
      {
        path: 'chambres',
        name: 'gestion-chambres',
        component: GestionChambres,
        meta: { requiresAuth: true },
      },
      {
        path: 'chambres/ajouter',
        name: 'ajout-chambre',
        component: AjouterChambre,
        meta: { requiresAuth: true },
      },
      {
        path: 'chambres/modifier/:id',
        name: 'modifier-chambre',
        component: ModifierChambre,
        meta: { requiresAuth: true },
      },
      {
        path: 'reservations',
        name: 'gestion-reservations',
        component: GestionReservations,
        meta: { requiresAuth: true },
      },
      {
        path: 'reservations/ajouter',
        name: 'ajout-reservations',
        component: AjouterReservation,
        meta: { requiresAuth: true },
      },
      {
        path: 'reservations/modifier/:id',
        name: 'modifier-reservations',
        component: ModifierReservation,
        meta: { requiresAuth: true },
      },
      {
        path: 'reservations/detail/:id',
        name: 'detail-reservations',
        component: DetailReservation,
        meta: { requiresAuth: true },
      },
      {
        path: 'reservations/recu/:id',
        name: 'recu',
        component: Recu,
        meta: { requiresAuth: true },
      },
      {
        path: 'types-chambres',
        name: 'gestion-types-chambres',
        component: GestionTypesChambres,
        meta: { requiresAuth: true },
      },
      {
        path: 'types/ajouter',
        name: 'ajout-type',
        component: AjouterType,
        meta: { requiresAuth: true },
      },
      {
        path: 'types/detail/:id',
        name: 'detail-type',
        component: DetailType,
        meta: { requiresAuth: true },
      },
      {
        path: 'types/modifier/:id',
        name: 'modifier-type',
        component: ModifierType,
        meta: { requiresAuth: true },
      },
      {
        path: 'utilisateurs/ajouter',
        name: 'ajout-utilisateur',
        component: AjouterUtilisateur,
        meta: { requiresAuth: true },
      },
      {
        path: 'utilisateurs/modifier/:id',
        name: 'modifier-utilisateur',
        component: ModifierUtilisateur,
        meta: { requiresAuth: true },
      },
      {
        path: 'utilisateurs/detail/:id',
        name: 'detail-utilisateur',
        component: DetailUtilisateur,
        meta: { requiresAuth: true },
      },
      {
        path: 'clients/ajouter',
        name: 'ajouter-client',
        component: AjouterClient,
        meta: { requiresAuth: true },
      },
      {
        path: 'clients/modifier/:id',
        name: 'modifier-client',
        component: ModifierClient,
        meta: { requiresAuth: true },
      },
      {
        path: 'clients/detail/:id',
        name: 'detail-client',
        component: DetailClient,
        meta: { requiresAuth: true },
      },
      {
        path: 'profil/:id',
        name: 'profil-utilisateur',
        component: UpdateProfile,
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.token) {
    next('/');
  } else {
    next();
  }
});

export default router;
