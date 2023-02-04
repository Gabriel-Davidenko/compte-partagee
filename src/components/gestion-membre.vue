<template>
    <h2>Ajouter un membre</h2>
    <label for="fname">pseudo</label>
    <input @keypress.enter="addMember()" type="text" id="fname" v-model="name"
        placeholder="Veuillez saissir votre pseudo" />
    <button @click="addMember()">Ajouter utilisateur</button>

    <h2>Membres du compte</h2>
    <ul>
        <li v-for="(member, index) in currentAccountMembersList" :key="index">name: {{ member.name }} - montant: {{ member.montant }}€ <button
                @click="deleteMember(member.id)">remove</button></li>
    </ul>
</template>
<script>
import { v4 as uuidv4 } from 'uuid';

export default {
    name: 'GestionMembre',
    data() {
        return {
            membersList: [],
            name: '',
        }
    },
    methods: {
        /**
         * Permet de supprimer un utilisateur seulement si il n'a pas de dépenses
         * @param {*} id 
         */
        deleteMember(id) {
            //vérfie si l'utilisateur a des dépenses ou non 
            if (this.membersList.find(member => member.id === id).depenseList.length != 0) {
                return;
            }
            this.membersList = this.membersList.filter(member => member.id !== id)
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
                compteId: this.$route.params.libelle,
                name: this.name,
                montant: 0,
                depenseList: [],
            });
            this.saveInLocalStorage();
            this.resetForm();
        },
        saveInLocalStorage() {
            localStorage.setItem('membersList', JSON.stringify(this.membersList));
        },
        resetForm() {
            this.name = '';
        }
    },
    computed: {
        currentAccountMembersList() {
            console.log(this.membersList.filter(member => member.compteId === this.$route.params.libelle))
            return this.membersList.filter(member => member.compteId === this.$route.params.libelle)
        }
    },
    mounted() {
        if (localStorage.getItem('membersList')) {
            this.membersList = JSON.parse(localStorage.getItem('membersList'))
        }
    },
}
</script>