import http from "@/http-common"

class AuthorsService {
    getAll() {
        return http.get("/authors");
    }

    add(author) {
        return http.post("/authors", author);
    }
}

export default new AuthorsService();