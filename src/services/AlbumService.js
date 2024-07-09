import { getToken } from "./localStorageService";

const ALBUM_REST_API_URL = 'http://localhost:8080/albums';
const accessToken = getToken();

class AlbumService {
    getAll() {
        return fetch(ALBUM_REST_API_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Get all albums failed: ' + err);
            });
    }
    getAlbum(id) {
        return fetch(`${ALBUM_REST_API_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Get album failed: ' + err);
            });
    }
    addAlbum(album) {
        return fetch(ALBUM_REST_API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(album)
        }).then(res => res.json())
            .catch(err => {
                console.error('Add album failed: ' + err);
            });
    }
    editAlbum(id) {
        return fetch(`${ALBUM_REST_API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Update album failed: ' + err);
            });
    }
    deleteAlbum(id) {
        return fetch(`${ALBUM_REST_API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Delete album failed: ' + err);
            });
    }
}

export default new AlbumService();