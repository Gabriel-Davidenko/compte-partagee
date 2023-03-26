
import { RouterLink } from 'vue-router';

<template>
    <h2>404 Not found</h2>
    <p>Désolé, nous n'avons pas trouvé la ressource que vous avez demandé.</p>
        <router-link  to="/">Retour à l'accueil</router-link>
    
</template>
<script>
export default {
    name: 'NotFound'
}
</script>