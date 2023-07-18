<template>
  <div id="app">
    <NavbarLibrary />

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
<script>
import NavbarLibrary from "@/components/NavbarLibrary";
export default {
  components: {NavbarLibrary}
}
</script>