<template>
  <div class="container w-50">
    <b-table :items="genres" :fields="fields"></b-table>
    <div class="d-flex justify-content-center">
      <b-button variant="outline" @click="modalShow = !modalShow">
        <b-icon icon="plus-circle"></b-icon>
      </b-button>
    </div>
    <b-modal v-model="modalShow" hide-footer hide-header-close title="Create new Genre">
      <div class="d-block text-center">
        <h3>Genre</h3>
      </div>
      <div>
        <b-form-group id="input-group-1" label="Genre Name:" label-for="input-1">
          <b-form-input
              id="input-1"
              v-model="genre.name"
              placeholder="Enter name"
              required
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="d-flex justify-content-end mt-3">
        <b-button-group>
          <b-button variant="outline-danger" @click="modalShow = !modalShow" squared>Cancel</b-button>
          <b-button variant="outline-success" @click="addGenre" squared>Add</b-button>
        </b-button-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
import GenresService from "@/services/GenresService";

export default {
  name: "authors-list",
  data() {
    return {
      genres: [],
      genre: {
        id: null,
        name: ""
      },
      modalShow: false,
      fields: [
        {key: "id", label: "ID"},
        {key: "name", label: "Name"}
      ]
    }
  },
  methods: {
    retrieveGenres() {
      GenresService.getAll()
          .then((res) => {
            this.genres = res.data;
          })
          .catch((e) => {
            console.log(e);
          })
    },

    addGenre() {
      GenresService.add(this.genre)
          .then(() => {
            this.retrieveGenres();
          })
          .catch(e => {
            console.log(e);
          })
      this.modalShow = !this.modalShow;
    }

  },
  mounted() {
    this.retrieveGenres();
  }
}
</script>

<style>
thead, tbody, tfoot, tr, td, th {
  text-align: left;
  vertical-align: middle;
}
</style>