import { getToken } from "./localStorageService";
import { removeToken } from "./localStorageService";

const AUTHENTICATION_REST_API_URL = 'http://localhost:8080/auth';
const accessToken = getToken();

class AuthenticationService {
    //outbound ???
    authenticate(authenticationRequest) {
        return fetch(`${AUTHENTICATION_REST_API_URL}/token`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(authenticationRequest)
        }).then(res => res.json())
            .catch(err => {
                console.error('Authenticate failed: ' + err);
            });
    }
    authenticate(introspectRequest) {
        return fetch(`${AUTHENTICATION_REST_API_URL}/introspect`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(introspectRequest)
        }).then(res => res.json())
            .catch(err => {
                console.error('Authenticate introspect failed: ' + err);
            });
    }
    logout(logOutRequest) {
        return fetch(`${AUTHENTICATION_REST_API_URL}/logout`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(logOutRequest)
        }).then(res => res.json())
            .catch(err => {
                console.error('Logout failed: ' + err);
            });
    }
    logOutRemoveToken() {
        removeToken();
    }
}

export default new AuthenticationService();