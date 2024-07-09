import { getToken } from "./localStorageService";

const PLAYLISTSONG_REST_API_URL = 'http://localhost:8080/playlistsongs';
const accessToken = getToken();

class PlaylistSongService {
    getAll() {
        return fetch(PLAYLISTSONG_REST_API_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Get all playlistSongs failed: ' + err);
            });
    }
    getPlaylistSong(id) {
        return fetch(`${PLAYLISTSONG_REST_API_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Get playlistSong failed: ' + err);
            });
    }
    addPlaylistSong(playlistSong) {
        return fetch(PLAYLISTSONG_REST_API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(playlistSong)
        }).then(res => res.json())
            .catch(err => {
                console.error('Add playlistSong failed: ' + err);
            });
    }
    editPlaylistSong(id) {
        return fetch(`${PLAYLISTSONG_REST_API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Update playlistSong failed: ' + err);
            });
    }
    deletePlaylistSong(id) {
        return fetch(`${PLAYLISTSONG_REST_API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Delete playlistSong failed: ' + err);
            });
    }
}

export default new PlaylistSongService();