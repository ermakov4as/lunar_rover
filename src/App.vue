<template>
  <v-app>
    <v-app-bar app>
      <div id="nav">
        <router-link to="/">Главная</router-link> |
        <router-link to="/robot">Управление роботом</router-link> |
        <router-link to="/about">Справка</router-link>
      </div>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.lune {
  background-image: url('./assets/lune_v2.png')
}
</style>
