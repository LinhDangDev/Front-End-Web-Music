import { getToken } from "./localStorageService";

const COMMENT_REST_API_URL = 'http://localhost:8080/comments';
const accessToken = getToken();

class CommentService {
    getAll() {
        return fetch(COMMENT_REST_API_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Get all comments failed: ' + err);
            });
    }
    getComment(id) {
        return fetch(`${COMMENT_REST_API_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Get comment failed: ' + err);
            });
    }
    addComment(comment) {
        return fetch(COMMENT_REST_API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(comment)
        }).then(res => res.json())
            .catch(err => {
                console.error('Add comment failed: ' + err);
            });
    }
    editComment(id) {
        return fetch(`${COMMENT_REST_API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Update comment failed: ' + err);
            });
    }
    deleteComment(id) {
        return fetch(`${COMMENT_REST_API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Delete comment failed: ' + err);
            });
    }
}

export default new CommentService();