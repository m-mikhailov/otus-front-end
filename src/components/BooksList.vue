<template>
  <div class="container w-75">
    <b-table :items="books" :fields="fields">
      <template #cell(name)="data">
        <b-form-input v-if="books[data.index].isEdit" type="text" v-model="book.name"></b-form-input>
        <span v-else>{{ data.value }}</span>
      </template>
      <template #cell(author)="data">
        <b-form-select v-if="books[data.index].isEdit" v-model="book.authorId" :options="authors"
                       class="form-select"></b-form-select>
        <span v-else>{{ data.value.name }}</span>
      </template>
      <template #cell(genre)="data">
        <b-form-select v-if="books[data.index].isEdit" v-model="book.genreId" :options="genres"
                       class="form-select"></b-form-select>
        <span v-else>{{ data.value.name }}</span>
      </template>
      <template #cell(action)="data">
        <b-button v-if="!books[data.index].isEdit" variant="outline" @click="editRowHandler(data)" size="sm">
          <b-icon icon="pencil"></b-icon>
        </b-button>
        <b-button v-else variant="outline" @click="onSubmit(data)" size="sm">
          <b-icon icon="check"></b-icon>
        </b-button>
        <b-button v-if="!books[data.index].isEdit" variant="outline" @click="deleteBook(data)" size="sm">
          <b-icon icon="trash"></b-icon>
        </b-button>
        <b-button v-if="!books[data.index].isEdit"
                  :to="{ name: 'comments', query: { bookId: data.item.id }}"
                  variant="outline" size="sm">
          <b-icon icon="list-stars"></b-icon>
        </b-button>
      </template>
    </b-table>
    <div class="d-flex justify-content-center">
      <b-button variant="outline" @click="showModal">
        <b-icon icon="plus-circle"></b-icon>
      </b-button>
    </div>
    <b-modal v-model="modalShow" hide-footer hide-header-close title="Create new Book">
      <div class="d-block text-center">
        <h3>Book</h3>
      </div>
      <div>
        <b-form-group id="input-group-1" label="Book Name:" label-for="input-1">
          <b-form-input
              id="input-1"
              v-model="book.name"
              placeholder="Enter name"
              required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Book Author:" label-for="input-2">
          <b-form-select
              id="input-2"
              class="form-select"
              v-model="book.authorId"
              :options="authors"
              required
          >
            <template #first>
              <b-form-select-option :value="null" disabled>-- Please select Author --</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>
        <b-form-group id="input-group-3" label="Book Genre:" label-for="input-3">
          <b-form-select
              id="input-3"
              class="form-select"
              v-model="book.genreId"
              :options="genres"
              required
          >
            <template #first>
              <b-form-select-option :value="null" disabled>-- Please select Genre --</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>
      </div>
      <div class="d-flex justify-content-end mt-3">
        <b-button-group>
          <b-button variant="outline-danger" @click="showModal" squared>Cancel</b-button>
          <b-button variant="outline-success" @click="addBook" squared>Add</b-button>
        </b-button-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
import BooksService from "@/services/BooksService";
import AuthorsService from "@/services/AuthorsService";
import GenresService from "@/services/GenresService";

export default {
  name: "books-list",
  data() {
    return {
      modalShow: false,
      book: {},
      books: [],
      authors: [],
      genres: [],
      fields: [
        {key: "id", label: "ID"},
        {key: "name", label: "Name"},
        {key: "author", label: "Author"},
        {key: "genre", label: "Genre"},
        {key: "action", label: ""},
      ]
    }
  },
  methods: {
    retrieveBooks() {
      BooksService.getAll()
          .then((res) => {
            this.books = res.data.map(book => ({...book, isEdit: false}));
          })
          .catch((e) => {
            console.log(e);
          })
    },

    addBook() {
      console.log(this.book);
      BooksService.add(this.book)
          .then(() => {
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          })
      this.modalShow = !this.modalShow;
      this.book = {};
    },

    refreshList() {
      this.retrieveBooks();
    },

    showModal() {
      this.modalShow = !this.modalShow;
      this.book = {
        authorId: null,
        genreId: null
      };
    },

    onSubmit(data) {
      this.updateBook(this.book);
      this.books[data.index].isEdit = !this.books[data.index].isEdit;
      this.book = {};
    },

    retrieveAuthors() {
      AuthorsService.getAll()
          .then((res) => {
            this.authors = res.data.map(this.getAuthorsOptions);
          })
          .catch((e) => {
            console.log(e);
          })
    },

    retrieveGenres() {
      GenresService.getAll()
          .then((res) => {
            this.genres = res.data.map(this.getGenresOptions);
          })
          .catch((e) => {
            console.log(e);
          })
    },

    updateBook(book) {
      BooksService.update(book)
          .then(() => {
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          })
    },

    deleteBook(data) {
      BooksService.delete(data.item.id)
          .then(() => {
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          })
    },

    getAuthorsOptions(author) {
      return {
        value: author.id,
        text: author.name,
      }
    },

    getGenresOptions(genre) {
      return {
        value: genre.id,
        text: genre.name,
      }
    },

    getBookFromItem(item) {
      return {
        id: item.id,
        name: item.name,
        authorId: item.author.id,
        genreId: item.genre.id
      }
    },

    editRowHandler(data) {
      this.books[data.index].isEdit = !this.books[data.index].isEdit;
      this.book = this.getBookFromItem(data.item);
      console.log(this.book);
    }
  },
  mounted() {
    this.retrieveBooks();
    this.retrieveAuthors();
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