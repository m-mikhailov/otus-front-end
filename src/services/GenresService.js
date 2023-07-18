import http from "@/http-common"

class GenresService {
    getAll() {
        return http.get("/genres");
    }

    add(genre) {
        return http.post("/genres", genre);
    }
}

export default new GenresService();