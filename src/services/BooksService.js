import http from "@/http-common"

class BooksService {
    getAll() {
        return http.get("/books");
    }

    add(book) {
        return http.post("/books", book);
    }

    update(book) {
        return http.put("/books", book);
    }

    delete(id) {
        return http.delete(`/books/${id}`);
    }
}

export default new BooksService();