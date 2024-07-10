import { getToken } from "./localStorageService";
const ARTIST_REST_API_URL = 'http://localhost:8080/artists';
const accessToken = getToken();

class ArtistService {
    getAll() {
        return fetch(ARTIST_REST_API_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Get all artists failed: ' + err);
            });
    }
    getArtist(id) {
        return fetch(`${ARTIST_REST_API_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Get artis failed: ' + err);
            });
    }
    addArtist(artist) {
        return fetch(ARTIST_REST_API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(artist)
        }).then(res => res.json())
            .catch(err => {
                console.error('Add artist failed: ' + err);
            });
    }
    editArtist(id) {
        return fetch(`${ARTIST_REST_API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Update artist failed: ' + err);
            });
    }
    deleteArtist(id) {
        return fetch(`${ARTIST_REST_API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Delete artist failed: ' + err);
            });
    }
}

export default new ArtistService();