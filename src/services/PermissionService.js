import { getToken } from "./localStorageService";

const PERMISSION_REST_API_URL = 'http://localhost:8080/permissions';
const accessToken = getToken();

class PermissionService {
    createPermission(permissionRequest) {
        return fetch(PERMISSION_REST_API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(permissionRequest)
        }).then(res => res.json())
            .catch(err => {
                console.error('Create permission failed: ' + err);
            });
    }
    getAll() {
        return fetch(PERMISSION_REST_API_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Get all permission failed: ' + err);
            });
    }
    deletePermission(id) {
        return fetch(`${PERMISSION_REST_API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Delete permission failed: ' + err);
            });
    }
}

export default new PermissionService();