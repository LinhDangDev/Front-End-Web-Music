import { getToken } from "./localStorageService";

const USER_REST_API_URL = 'http://localhost:8080/users';
const accessToken = getToken();

class UserService {
    createUser(userCreationRequest) {
        return fetch(USER_REST_API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(userCreationRequest)
        }).then(res => res.json())
            .catch(err => {
                console.error('Create user failed: ' + err);
            });
    }
    getUsers() {
        return fetch(USER_REST_API_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Get all users failed: ' + err);
            });
    }
    getUser(id) {
        return fetch(`${USER_REST_API_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Get user failed: ' + err);
            });
    }
    getMyInfo() {
        return fetch(`${USER_REST_API_URL}/myInfo`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Get info user failed: ' + err);
            });
    }
    deleteUser(id) {
        return fetch(`${USER_REST_API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Delete user failed: ' + err);
            });
    }
    updateUser(id) {
        return fetch(`${USER_REST_API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json())
            .catch(err => {
                console.error('Update user failed: ' + err);
            });
    }
}

export default new UserService();