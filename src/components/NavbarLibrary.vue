<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <div class="container-fluid">
      <b-navbar-brand href="#">Library</b-navbar-brand>
      <b-navbar-nav class="me-auto">
        <b-nav-item>
          <router-link class="nav-link active" aria-current="page" to="/books">Books</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link class="nav-link active" aria-current="page" to="/authors">Authors</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link class="nav-link active" aria-current="page" to="/genres">Genres</router-link>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ms-auto">
        <b-button variant="outline-success" type="submit" squared>Log In</b-button>
      </b-navbar-nav>

    </div>
  </b-navbar>
</template>

<script>
export default {
  name: "NavbarLibrary"
}
</script>