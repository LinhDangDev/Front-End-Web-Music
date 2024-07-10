import { getToken } from "./localStorageService";

const MENU_REST_API_URL = 'http://localhost:8080/menus';
const accessToken = getToken();

class MenuService {
    getAll() {
        return fetch(MENU_REST_API_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Get all menus failed: ' + err);
            });
    }
    getMenu(id) {
        return fetch(`${MENU_REST_API_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Get menu failed: ' + err);
            });
    }
    addMenu(menu) {
        return fetch(MENU_REST_API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(menu)
        }).then(res => res.json())
            .catch(err => {
                console.error('Add menu failed: ' + err);
            });
    }
    editMenu(id) {
        return fetch(`${MENU_REST_API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Update menu failed: ' + err);
            });
    }
    deleteMenu(id) {
        return fetch(`${MENU_REST_API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Delete menu failed: ' + err);
            });
    }
}

export default new MenuService();