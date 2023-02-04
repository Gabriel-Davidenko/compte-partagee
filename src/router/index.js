import CreationCompte from '@/components/compte-partage';
import GestionMembre from '@/components/gestion-membre';
import DepenseComponent from '@/components/depense';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { name: 'CreationCompte', path: '/creation', component: CreationCompte },
    { name: 'GestionMembre', path: '/gestion-membre/:libelle', component: GestionMembre },
    { name: 'DepenseComponent', path: '/depense/:membre', component: DepenseComponent}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;