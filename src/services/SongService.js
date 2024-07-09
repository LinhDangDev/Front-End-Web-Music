import { getToken } from "./localStorageService";

const SONG_REST_API_URL = 'http://localhost:8080/songs';
const accessToken = getToken();

class SongService {
    getAll() {
        return fetch(SONG_REST_API_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Get all songs failed: ' + err);
            });
    }
    getSongForPlay(id) {
        return fetch(`${SONG_REST_API_URL}/${id}/play`, { // Gọi endpoint mới
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
            console.error('Get song for playing failed:', err);
            });
        }
    getSong(id) {
        return fetch(`${SONG_REST_API_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Get song failed: ' + err);
            });
    }
    addSong(song) {
        return fetch(SONG_REST_API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(song)
        }).then(res => res.json())
            .catch(err => {
                console.error('Add song failed: ' + err);
            });
    }
    editSong(id) {
        return fetch(`${SONG_REST_API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Update song failed: ' + err);
            });
    }
    deleteSong(id) {
        return fetch(`${SONG_REST_API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Delete song failed: ' + err);
            });
    }
}

export default new SongService();