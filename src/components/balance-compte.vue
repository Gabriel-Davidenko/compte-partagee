<template>
    <ul class="nav  justify-content-center">
        <li class="nav-item"><router-link class="nav-link" :to="'/depense/' + account.id">depenses</router-link></li>
        <li class="nav-item"><router-link class="nav-link" :to="'/gestion-membre/' + account.id">membres</router-link></li>
    </ul>
    <h2>Balance du compte </h2>
    <div class="row">
        <p class="col">total compte : {{ account.montant }}€</p>
    </div>
    <h3>Balance des membres du compte</h3>
    <div class="row">
    <table class="table ">
        <thead>
            <tr>
                <td>Nom</td>
                <td>balance (en €)</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="member in membersList" :key="member.id">
                <template v-if="calculateMemberBalance(member.id)>=0">
                    <td class="table-success">{{ member.name }}</td>
                    <td class="table-success">{{ calculateMemberBalance(member.id) }}€</td>
                    
                </template>
                <template v-else>
                    <td class="table-danger">{{ member.name }}</td>
                    <td class="table-danger">{{ calculateMemberBalance(member.id) }}€</td>
                    
                </template>
            </tr>
        </tbody>
    </table>
</div>
</template>
<script>
export default {
    name: 'balanceCompte',
    data() {
        return {
            account: {},
            membersList: []
        }
    },
    methods: {
        /**
         * Calcule la balance de chaque membre du groupe
         * @param {sting} memberId du membre du groupe
         */
        calculateMemberBalance(memberId) {
            const member = this.membersList.find(member => member.id === memberId);
            return this.account.montant / this.membersList.length * -1 + member.montant
        }
    },
    mounted() {
        //récupère le compte dans le local storage
        if (localStorage.getItem('accountList')) {
            this.account = JSON.parse(localStorage.getItem('accountList')).find(account => account.id === this.$route.params.accountId);
        }
        //récupère les membres du groupe dans le local storage
        if (localStorage.getItem('membersList')) {
            this.membersList = JSON.parse(localStorage.getItem('membersList')).filter(member => member.compteId === this.account.id)
        }
    }
}
</script>