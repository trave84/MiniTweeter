// Deconstruction: Module to Htpp Object Instance
import { http } from "./Http";

// GET posts on DOMLoad Auto
document.addEventListener("DOMContentLoaded", getPosts);

function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then(data => console.log(data))
    .catch(err => console.log(err));
}
