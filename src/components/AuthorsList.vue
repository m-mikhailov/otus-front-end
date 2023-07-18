<template>
  <div class="container w-50">
    <b-table :items="authors" :fields="fields"></b-table>
    <div class="d-flex justify-content-center">
      <b-button variant="outline" @click="modalShow = !modalShow">
        <b-icon icon="plus-circle"></b-icon>
      </b-button>
    </div>
    <b-modal v-model="modalShow" hide-footer hide-header-close title="Create new Author">
      <div class="d-block text-center">
        <h3>Author</h3>
      </div>
      <div>
        <b-form-group id="input-group-1" label="Author Name:" label-for="input-1">
          <b-form-input
              id="input-1"
              v-model="author.name"
              placeholder="Enter name"
              required
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="d-flex justify-content-end mt-3">
        <b-button-group>
          <b-button variant="outline-danger" @click="modalShow = !modalShow" squared>Cancel</b-button>
          <b-button variant="outline-success" @click="addAuthor" squared>Add</b-button>
        </b-button-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
import AuthorsService from "@/services/AuthorsService";

export default {
  name: "authors-list",
  data() {
    return {
      author: {
        id: null,
        name: ""
      },
      authors: [],
      modalShow: false,
      fields: [
        {key: "id", label: "ID"},
        {key: "name", label: "Name"}
      ]
    }
  },
  methods: {

    retrieveAuthors() {
      AuthorsService.getAll()
          .then((res) => {
            this.authors = res.data;
          })
          .catch((e) => {
            console.log(e);
          })
    },

    addAuthor() {
      AuthorsService.add(this.author)
          .then(() => {
            this.retrieveAuthors();
          })
          .catch(e => {
            console.log(e);
          })
      this.modalShow = !this.modalShow;
    }

  },
  mounted() {
    this.retrieveAuthors();
  }
}
</script>

<style>
thead, tbody, tfoot, tr, td, th {
  text-align: left;
  vertical-align: middle;
}
</style>