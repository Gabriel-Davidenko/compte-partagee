<template>
    <ul class="nav justify-content-center">
        <li class="nav-item"><router-link class="nav-link" :to="'/gestion-membre/' + accountId">membres</router-link>
        </li>
        <li class="nav-item"><router-link class="nav-link" :to="'/compte/' + accountId">balance</router-link></li>
    </ul>
    <div class="row">
        <h2>Ajouter une dépense</h2>
        <div class="row">
            <label  class="form-label" for="flibelle">Libelle</label>
            <input class="form-control" type="texte" placeholder="libelle de la dépense" v-model="libelle">
        </div>
        <div class="row">

            <label class="form-label" for="fmontant">Montant</label>
            <input class="form-control" v-model="montant" id="fmontant" type="number" placeholder="montant en euro (€)">
        </div>
        <div class="row">
            <label class="form-label" for="fmember">Membre du compte</label>
            <select class="form-control" name="fmember" id="fmember" v-model="memberId">
                <option v-for="(member) in accountMembersList" :key="member.id" :value="member.id">
                    {{ member.name }}
                </option>
            </select>

        </div>
        <div class="row">
            <button class="btn btn-primary" :disabled="formValidator" @click="saveDepense()">Add depense</button>
        </div>
    </div>
    <div class="row">
        <h2>liste des dépenses </h2>
        <table class=" table table-striped">
            <thead>
            <tr>
                <th>Membre</th>
                <th>libelle</th>
                <th>Montant (en €)</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="depense in depenseList" :key="depense.depenseId">
                <td>{{ getMemberName(depense.memberId) }}</td>
                <td>{{ depense.libelle }}</td>
                <td>{{ depense.montant }}€</td>
                <td>{{ depense.date }}</td>
            </tr>
        </tbody>
        </table>
    </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
    name: 'depenseComponent',
    data() {
        return {
            depenseList: [],
            libelle: '',
            montant: 0,
            memberId: '',
            accountId: this.$route.params.accountId,
        }
    },
    methods: {
        getMemberName(memberId) {
            return JSON.parse(localStorage.getItem('membersList')).find(member => member.id === memberId)?.name
        },
        /**
         * Ajoute une dépense à la liste des dépenses, 
         * la sauvegarde dans le local storage,
         * ajoute la dépense au membre qui a été choisit,
         * reinitialise le formulaire. 
         */
        saveDepense() {
            const newDepense = {
                depenseId: uuidv4(),
                accountId: this.accountId,
                libelle: this.libelle,
                memberId: this.memberId,
                montant: this.montant,
                date: new Date()
            }
            this.depenseList.push(newDepense)
            this.saveInLocalStorage('depensesList', this.depenseList);
            this.addDepenseToUser(newDepense.depenseId, newDepense.montant);
            this.resetForm();
            this.updateAccountTotal(newDepense.montant);
        },
        /**
         * Ajoute une dépense à la liste des dépense de l'utilisateur
         * @param {string} depenseId id de la dépense
         * @param {number} depenseAmount montant de la dépense
         */
        addDepenseToUser(depenseId, depenseAmount) {
            const membersList = JSON.parse(localStorage.getItem('membersList'))
            const member = membersList.find(member => member.id === this.memberId);
            member.depenseList.push(depenseId);
            member.montant += depenseAmount;
            this.saveInLocalStorage('membersList', membersList)
        },
        /**
         * Sauvegarde une liste  dans le local storage
         * @param {string} lcKey clé de la liste du local storage
         * @param {array} list liste a sauvegarder dans le local stroage
         */
        saveInLocalStorage(lcKey, list) {
            localStorage.setItem(lcKey, JSON.stringify(list));
        },
        /**
         * Reinitialise le formulaire
         */
        resetForm() {
            this.libelle = '';
            this.montant = 0;
            this.memberId = '';
        },
        /**
         * Met à jour le montant du compte courant
         * @param {int} montant 
         */
        updateAccountTotal(montant) {
            const accountList = JSON.parse(localStorage.getItem('accountList'))
            const account = accountList.find(account => account.id === this.accountId);
            account.montant += montant;
            this.saveInLocalStorage('accountList', accountList);

        }
    },
    computed: {
        /**
         * Calcule la liste des membres du compte
         * @return {Array} la liste des utilisateurs du compte courant
         */
        accountMembersList() {
            return localStorage.getItem('membersList') ?
                JSON.parse(localStorage.getItem('membersList')).filter(member => member.compteId === this.accountId)
                : [];
        },
        /**
         * Vérifie les données du formulaire (foncitonnement similaire au validator angular)
         * @returns {boolean} false si le formulaire est valide
         */
        formValidator() {
            if (!this.libelle) {
                return true;
            }
            if (this.montant === 0) {
                return true;
            }
            if (!this.memberId) {
                return true;
            }
            return false;
        },
    },
    mounted() {
        //Récupère la liste des dépenses dans le local storage
        if (localStorage.getItem('depensesList')) {
            this.depenseList = JSON.parse(localStorage.getItem('depensesList')).filter(depense=>depense.accountId == this.$route.params.accountId);
        }
    }

}
</script>