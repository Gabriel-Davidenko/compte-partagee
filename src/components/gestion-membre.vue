<template>
    <ul class="nav justify-content-center">
        <li class="nav-item"><router-link class="nav-link" :to="'/depense/' + accountId">depense</router-link></li>
        <li class="nav-item"><router-link class="nav-link" :to="'/compte/' + accountId">balance</router-link></li>
    </ul>

    <h2 class="row">Ajouter un membre</h2>
    <div class="row">
        <label class="" for="fname">pseudo</label>
        <input class="" @keypress.enter="addMember()" type="text" id="fname" v-model="name"
            placeholder="Veuillez saissir votre pseudo" />
    </div>
    <button class="btn btn-primary" @click="addMember()">Ajouter utilisateur</button>



    <h2>Membres du compte</h2>
    <table class="table table-striped">
        <thead>
            <tr>
                <td>pseudo</td>
                <td>montant (en €)</td>
                <td>supprimer</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="member in currentAccountMembersList" :key="member.id">
            <td>{{ member.name }}</td>
            <td>{{ member.montant }}€</td>
            <td>
                <button v-if="isDeletable(member.id)"  @click="deleteMember(member.id)" class="btn btn-danger">supprimer</button>
            </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import { v4 as uuidv4 } from 'uuid';

export default {
    name: 'GestionMembre',
    data() {
        return {
            membersList: [],
            name: '',
            accountId: this.$route.params.accountId,
        }
    },
    methods: {

        /**
         * Permet de supprimer un utilisateur seulement si il n'a pas de dépenses
         * @param {string} memberId 
         */
        deleteMember(memberId) {
            if(!this.isDeletable(memberId)){
                return;
            }
            this.membersList = this.membersList.filter(member => member.id !== memberId)
            this.saveInLocalStorage();
        },
        /**
        * Ajoute un membre dans la liste des membre du compte
        * @constant {Array<string, string, int>} membersList liste des membres
        */
        addMember() {
            if (!this.name) {
                return;
            }
            this.membersList.push({
                id: uuidv4(),
                compteId: this.accountId,
                name: this.name,
                montant: 0,
                depenseList: [],
            });
            this.saveInLocalStorage();
            this.resetForm();
        },
        /**
         * Sauvegarde la liste des memebres dans le local storage
         * @constant membersList
         */
        saveInLocalStorage() {
            localStorage.setItem('membersList', JSON.stringify(this.membersList));
        },
        /**
         * Reinitilise le formulaire
         */
        resetForm() {
            this.name = '';
        },
        /**
         * Vérifie si on peut supprimer l'utilisateur ou non
         * @param {string} memberId id de l'utilisateur
         * @returns {boolean} true si l'utilisateur peut être supprimé 
         */
        isDeletable(memberId){
            return this.membersList.find(member=>member.id===memberId).depenseList==0; 
        }
    },
    computed: {
        /**
         * calcule la liste des membres du compte courant
         * @returns {Array} currentAccountMembersList  
         */
        currentAccountMembersList() {
            return this.membersList.filter(member => member.compteId === this.accountId)
        }
    },
    mounted() {
        //Récupère la liste des membres du local storage
        if (localStorage.getItem('membersList')) {
            this.membersList = JSON.parse(localStorage.getItem('membersList'))
        }
    },
}
</script>