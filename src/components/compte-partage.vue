<template>
    <h2>Ajouter un compte</h2>
    <div>
        <label for="flibelle">libelle</label>
        <input id="flibelle" placeholder="Libelle de votre compte" v-model="libelle" />
        <br>
        <label for="fdescription">description</label>
        <textarea id="fdescription" placeholder="Description de votre compte" v-model="description" />
        <br>
        <button @click="createAccount()">Ajouter le compte</button>
    </div>
    <ul>
        <li v-for="(account, index) in accountList" :key="index">
        libelle : <router-link v-bind:to="'/gestion-membre/'+ account.id">{{ account.libelle }}</router-link> - 
        description : {{ account.description }} - 
        date de creation : {{account.createdAt}}
    </li>
    </ul>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

/**
 * @todo mettre une sécurité pour ne pas ajouter si il manque un champ 
 * listener enter pour ajouter
 * changer les liste par des card avec le titre, la desc et un lien vers la page de gestion des membres 
 */
export default {
    name: 'comptePartage',
    data() {
        return {
            accountList: [],
            libelle: '',
            description: '',
            optionsDate: {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            }
        }
    },
    methods: {
        /**
         * Créer un compte partage
         * @constant {Array <{String, String, Date}>} accountList
        */
        createAccount() {
            this.accountList.push({
                id: uuidv4(),
                libelle: this.libelle,
                description: this.description,
                createdAt: new Date().toLocaleDateString('fr-FR',this.optionsDate),
            });
            this.resetForm();
            this.saveInLocalStorage();
        },
        /**
         * reinitialise le formulaire
         */
        resetForm() {
            this.description = '';
            this.libelle = '';
        },
        /**
         * Sauvegarde le compte dans le localStorage
         *  @constant {Array <{String, String, Date}>} accountList
         */
        saveInLocalStorage() {
            localStorage.setItem("accountList", JSON.stringify(this.accountList));
        }
    },
    mounted() {
        if (localStorage.getItem('accountList')) {
            try {
                this.accountList = JSON.parse(localStorage.getItem('accountList'));
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>