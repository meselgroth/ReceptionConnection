import URLSearchParams from 'url-search-params';

export default class AuthService {
    login(username, password) {
        const urlencodedFrom = new URLSearchParams();
        urlencodedFrom.set("username", username);
        urlencodedFrom.set("password", password);
        urlencodedFrom.set("grant_type", "password");

        const request = new Request('/api/token', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: urlencodedFrom.toString()
        });
        return fetch(request).then(response => this.parse(response))
            .then(data => this.extractToken(data));
    }
    logout(){
        delete localStorage.token;
    }
    register(username, password, confirmPassword) {
        const newUser = { Email: username, Password: password, ConfirmPassword: confirmPassword };

        const request = new Request('/api/account/Register', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(newUser)
        });
        return fetch(request).then(response => { if (response.ok) return true; });
    }
    parse(response) {
        if (response.ok) {
            return response.json();
        }
        else {
            console.log(response.statusText);
        }
    }
    extractToken(data) {
        if (data) {
            if (data.access_token) {
                localStorage.token = data.access_token;
                return true;
            }
        }
    }
    get token() {
        return localStorage.token;
    }
    get loggedIn() {
        return !!localStorage.token;
    }
    get isManager() {
        return true;
    }
}