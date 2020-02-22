import { apiUrl } from "../config.json";
import http from "./httpService";

const apiEndpoint = apiUrl + "/api/auth/verify_register/verify";

export function verifyRegister(user, country_id) {
    country_id = country_id ? parseInt(country_id) : 0;
    return http.get(apiEndpoint, {
        token: user.first_name,
        cellphone_no: user.last_name,
        country_id: country_id,
    });
}
