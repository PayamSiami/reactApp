import { apiUrl } from "../config.json";
import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = apiUrl + "/api/auth";
const token = "token";

export async function login(cellphone_no, password, country_id) {
    country_id = country_id ? parseInt(country_id) : 0;
    const {
        data: { user }
    } = await http.post(apiEndpoint + "/login", { cellphone_no, password, country_id });
    console.log("jwt", user.token);
    localStorage.setItem(token, user.token);
}

http.setJwt(getLocalJwt());

export function getLocalJwt() {
    return localStorage.getItem(token);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(token, jwt);
}

export function logout() {
    localStorage.removeItem(token);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(token);
        const currentUser = jwtDecode(jwt);
        console.log("currentUser", currentUser);
        return currentUser;
    } catch (ex) {
        console.log(ex);
        return null;
    }
}