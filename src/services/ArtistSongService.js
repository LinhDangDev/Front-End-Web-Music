import { getToken } from "./localStorageService";
const ARTISTSONG_REST_API_URL = 'http://localhost:8080/artistSong';
const accessToken = getToken();

class ArtistSongService {
    getAll() {
        return fetch(ARTISTSONG_REST_API_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Get all artistSongs failed: ' + err);
            });
    }
    getArtistSong(id) {
        return fetch(`${ARTISTSONG_REST_API_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Get artistSong failed: ' + err);
            });
    }
    addArtistSong(artistSong) {
        return fetch(ARTISTSONG_REST_API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(artistSong)
        }).then(res => res.json())
            .catch(err => {
                console.error('Add artistSong failed: ' + err);
            });
    }
    editArtistSong(id) {
        return fetch(`${ARTISTSONG_REST_API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Update artistSong failed: ' + err);
            });
    }
    deleteArtistSong(id) {
        return fetch(`${ARTISTSONG_REST_API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Delete artistSong failed: ' + err);
            });
    }
}

export default new ArtistSongService();