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


const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    children: [
      {
        path: 'utilisateurs',
        name: 'gestion-utilisateurs',
        component: GestionUtilisateurs,
      },
      {
        path: 'clients',
        name: 'gestion-clients',
        component: GestionClients,
      },
      {
        path: 'chambres',
        name: 'gestion-chambres',
        component: GestionChambres,
      },
      {
        path: 'reservations',
        name: 'gestion-reservations',
        component: GestionReservations,
      },
      {
        path: 'types-chambres',
        name: 'gestion-types-chambres',
        component: GestionTypesChambres,
      },
      {
        path: 'types/ajouter',
        name: 'ajout-type',
        component: AjouterType,
      },
      {
        path: 'types/detail/:id',
        name: 'detail-type',
        component: DetailType,
      },
      {
        path: 'types/modifier/:id',
        name: 'modifier-type',
        component: ModifierType,
      },
      {
        path: 'utilisateurs/ajouter',
        name: 'ajout-utilisateur',
        component: AjouterUtilisateur,
      },
      {
        path: 'utilisateurs/modifier/:id',
        name: 'modifier-utilisateur',
        component: ModifierUtilisateur,
      },
      {
        path: 'utilisateurs/detail/:id',
        name: 'detail-utilisateur',
        component: DetailUtilisateur,
      },
      {
        path: 'clients/ajouter',
        name: 'ajouter-client',
        component: AjouterClient,
      },
      {
        path: 'clients/modifier/:id',
        name: 'modifier-client',
        component: ModifierClient,
      },
      {
        path: 'clients/detail/:id',
        name: 'detail-client',
        component: DetailClient,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes,
});

export default router;
