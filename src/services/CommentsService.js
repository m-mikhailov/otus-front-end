import http from "@/http-common"

class CommentsService {

    getAllByBookId(bookId) {
        return http.get('/comments', { params: {bookId: bookId} });
    }

    add(comment) {
        return http.post('/comments', comment);
    }

    delete(id) {
        return http.delete(`/comments/${id}`);
    }

}

export default new CommentsService();