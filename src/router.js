import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/books",
            name: "books",
            component: () => import("@/components/BooksList")
        },
        {
            path: "/authors",
            name: "authors",
            component: () => import("@/components/AuthorsList")
        },
        {
            path: "/genres",
            name: "genres",
            component: () => import("@/components/GenresList")
        },
        {
            path: "/comments",
            name: "comments",
            component: () => import("@/components/BookComments")
        }
    ]
});