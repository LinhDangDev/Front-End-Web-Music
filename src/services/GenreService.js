import { getToken } from "./localStorageService";

const GENRE_REST_API_URL = "http://localhost:8080/genres";
const accessToken = getToken();

class GenreService {
  getAll() {
    return fetch(GENRE_REST_API_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error("Get all genres failed: " + err);
      });
  }
  getSongsByGenreId(genreId) {
    return fetch(`${GENRE_REST_API_URL}/${genreId}/songs`, {
      // Endpoint mới để lấy bài hát theo thể loại
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error("Get songs by genre failed:", err);
      });
  }
  getGenre(id) {
    return fetch(`${GENRE_REST_API_URL}/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error("Get genre failed: " + err);
      });
  }
  addGenre(genre) {
    return fetch(GENRE_REST_API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(genre),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error("Add genre failed: " + err);
      });
  }
  editGenre(id) {
    return fetch(`${GENRE_REST_API_URL}/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error("Update genre failed: " + err);
      });
  }
  deleteGenre(id) {
    return fetch(`${GENRE_REST_API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error("Delete genre failed: " + err);
      });
  }
}

export default new GenreService();
