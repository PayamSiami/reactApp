import { apiUrl } from "../config.json";
import http from "./httpService";

const apiEndpoint = apiUrl + "/api/service/search";

function movieUrl(id) {
    return `${apiEndpoint}/${id}`;
}

export function getServices(term = 's') {
    return http.post(apiEndpoint, {
        title: term
    }
    );
}

export function getMovie(movieId) {
    return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
    if (movie.id) {
        return http.put(movieUrl(movie.id), movie);
    }

    return http.post(apiEndpoint, movie);
}

export function deleteMovie(movieId) {
    return http.delete(movieUrl(movieId));
}
