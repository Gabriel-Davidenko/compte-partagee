<template>
  <div class="container ">
    <div class="row">
      <h1 class="col text-center">All will be one</h1>
    </div>
    <ul class="nav justify-content-center ">
      <li class="nav-item"><router-link class="nav-link" to="/">Comtes</router-link></li>
      <li class="nav-item"><router-link class="nav-link" to="/help">Aide</router-link></li>
    </ul>
    <router-view class="row" />
  </div>
</template>

<script>
export default {
  name: 'App',

  components: {
  }
}
</script>

