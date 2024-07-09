import { getToken } from "./localStorageService";

const ROLE_REST_API_URL = 'http://localhost:8080/roles';
const accessToken = getToken();

class RoleService {
    createRole(roleRequest) {
        return fetch(ROLE_REST_API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(roleRequest)
        }).then(res => res.json())
            .catch(err => {
                console.error('Create role failed: ' + err);
            });
    }
    getAll() {
        return fetch(ROLE_REST_API_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Get all roles failed: ' + err);
            });
    }
    deleteRole(id) {
        return fetch(`${ROLE_REST_API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Delete role failed: ' + err);
            });
    }
}

export default new RoleService();