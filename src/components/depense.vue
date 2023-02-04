<template>
    <button @click="this.isCredited = true">Créditer</button>
    <button @click="this.isCredited = false">Débiter</button>
    <label for="fmontant" >Montant</label>
    &nbsp;
    <input v-model="montant" id="fmontant" type="number" placeholder="montant en euro (€)">

</template>

<script>
import { v4 as uuidv4 } from 'uuid';
export default {
    name: 'depenseComponent',
    data() {
        return {
            depenseList: [],
            isCredited: undefined,
            montant : 0
        }
    },
    methods: {
        /**
         * isCredited = null : on demande à l'utilisateur de choissir si son opération est un crédit ou un débit
         * isCredited = true : on ajoute de l'argent sur le compte (+)
         * isCredited = false : on retire de l'argent sur le compte (-)
         */
        saveDepense() {
            if (this.isCredited == null) {
                return; 
            }
            const newDepense = {
                depenseId : uuidv4(),
                accountId: '',
                memberId: '',
                value: this.isCredited ? +this.montant : -this.montant
        }
            this.depenseList.push(newDepense)
        },
        addDepenseToUser() {
            //get user from local storage 

            //listeDepense.push(uuid);

            //user.montant +=
      }
    },
    computed: {
        test() {
            if (this.isCredited == null) {
                return 0;
            }
            return this.isCredited? 1:-1
        }
    },
    mounted() {
        //Récupère la liste des dépenses dans le local storage
        if (localStorage.getItem('depensesList')) {
            this.depenseList = localStorage.getItem('depensesList');
        }
    }

}
</script>