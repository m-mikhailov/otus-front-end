<template>
  <div class="container">
    <h2>Book Comments</h2>
    <ul class="list-unstyled w-50 d-flex" v-for="(c, index) in comments" :key="c.id">
      <b-media class="d-flex me-auto" tag="li">
        <template #aside>
          <b-img blank blank-color="#ccc" width="64" alt="placeholder"></b-img>
        </template>
        <h5>Comment #{{ index + 1 }}</h5>
        <p>{{ c.text }}</p>
      </b-media>
      <b-button class="ms-auto" variant="outline" @click="deleteComment(c.id)" size="sm">
        <b-icon icon="x"></b-icon>
      </b-button>
    </ul>
    <div class="d-flex flex-row w-50">
      <b-form-input v-model="comment.text"
                    class="me-3"
                    placeholder="Enter new comment"></b-form-input>
      <b-button variant="outline-primary" @click="addComment">Add</b-button>
    </div>
  </div>
</template>

<script>
import CommentsService from "@/services/CommentsService";

export default {
  name: "book-comments",
  data() {
    return {
      bookId: this.$router.history.current.query.bookId,
      comments: [],
      comment: {
        text: "",
        bookId: null
      }
    }
  },
  methods: {
    retrieveComments() {
      CommentsService.getAllByBookId(this.bookId)
          .then(res => {
            this.comments = res.data;
          })
          .catch(e => {
            console.log(e);
          })
    },

    addComment() {
      this.comment.bookId = this.bookId;
      CommentsService.add(this.comment)
          .then(() => {
            this.retrieveComments();
          })
          .catch(e => {
            console.log(e);
          })
      this.comment = {};
    },

    deleteComment(id) {
      CommentsService.delete(id)
          .then(() => {
            this.retrieveComments();
          })
          .catch(e => {
            console.log(e);
          })
    },
  },
  mounted() {
    this.retrieveComments();
  }
}
</script>
