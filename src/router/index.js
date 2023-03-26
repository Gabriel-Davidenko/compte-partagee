import CreationCompte from '@/components/compte-partage';
import GestionMembre from '@/components/gestion-membre';
import DepenseComponent from '@/components/depense';
import BalanceCompte from '@/components/balance-compte';
import HelperComponent from '@/components/helper';
import NotFoundComponent from '@/components/not-found';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { name: 'CreationCompte', path: '/', component: CreationCompte },
    { name: 'GestionMembre', path: '/gestion-membre/:accountId', component: GestionMembre },
    { name: 'DepenseComponent', path: '/depense/:accountId', component: DepenseComponent},
    { name: 'BalanceComponent', path: '/compte/:accountId', component: BalanceCompte},
    { name: 'HelperComponent', path: '/help', component: HelperComponent},
    { name: 'notFoundComponent', path: '/:pathMatch(.*)*', component: NotFoundComponent},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;