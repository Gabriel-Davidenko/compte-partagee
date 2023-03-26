<template>
    <div class="row">
        <h2 class="col">Ajouter un compte</h2>
        <div class="row">
            <label class="form-label" for="flibelle">libelle</label>
            <input class="form-control" id="flibelle" placeholder="Libelle de votre compte" v-model="libelle" />
            <br>
            <label class="form-label" for="fdescription">description</label>
            <textarea class="form-control" id="fdescription" placeholder="Description de votre compte" v-model="description"></textarea>
            <br>
            <button type="button" class="btn btn-primary" :disabled="formValidator" @click="createAccount()">Ajouter le
                compte</button>
        </div>
    </div>
    <div class="row">
        <table class="table table-stripedtable table-striped">
            <thead>
                <tr>
                    <th>libelle</th>
                    <th>description</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="account in accountList" :key="account.id">
                    <td><router-link v-bind:to="'/compte/' + account.id">{{ account.libelle }}</router-link></td>
                    <td>{{ account.description }}</td>
                    <td>{{ account.createdAt }}</td>
                </tr>
            </tbody>
        </table>
    </div>
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
                montant: 0,
                createdAt: new Date().toLocaleString('fr-FR', { timeZone: 'UTC' }),
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
    computed: {
        /**
         * calcule si le formulaire est valide ou non
         */
        formValidator() {
            if (!this.libelle) {
                return true
            }
            if (!this.description) {
                return true
            }
            return false
        }
    },
    mounted() {
        //récupère la liste des comptes dans le local storage
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