import { apiUrl } from "../config.json";
import http from "./httpService";

const apiEndpoint = apiUrl + "/api/auth/register";

export function register(user, country_id) {
    country_id = country_id ? parseInt(country_id) : 0;
    return http.post(apiEndpoint, {
        first_name: user.first_name,
        last_name: user.last_name,
        country_id: country_id,
        cellphone_no: user.cellphone_no,
        password: user.password,
        confirm_password: user.confirm_password
    });
}
