import { getToken } from "./localStorageService";

const PLAYLIST_REST_API_URL = 'http://localhost:8080/playlists';
const accessToken = getToken();

class PlaylistService {
    getAll() {
        return fetch(PLAYLIST_REST_API_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Get all playlists failed: ' + err);
            });
    }
    getPlaylist(id) {
        return fetch(`${PLAYLIST_REST_API_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Get playlist failed: ' + err);
            });
    }
    addPlaylist(playlist) {
        return fetch(PLAYLIST_REST_API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(playlist)
        }).then(res => res.json())
            .catch(err => {
                console.error('Add playlist failed: ' + err);
            });
    }
    editPlaylist(id) {
        return fetch(`${PLAYLIST_REST_API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Update playlist failed: ' + err);
            });
    }
    deletePlaylist(id) {
        return fetch(`${PLAYLIST_REST_API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Delete playlist failed: ' + err);
            });
    }
}

export default new PlaylistService();