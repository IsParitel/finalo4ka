import { makeAutoObservable } from "mobx";
import { jwtDecode } from "jwt-decode";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {};
        this._role = "";
        makeAutoObservable(this);
        this.initializeUserFromToken();
    }

    initializeUserFromToken() {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                this.setUser(decoded);
                this.setIsAuth(true);
                this.setRole(decoded.role || "USER");
            } catch (error) {
                console.error("Ошибка при декодировании токена:", error);
            }
        }
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUser(user) {
        this._user = user;
    }

    setRole(role) {
        this._role = role;
    }

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }

    get role() {
        return this._role;
    }
}
