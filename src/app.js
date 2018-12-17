//Module Object Instances brought in
import { http } from "./Http";
import { ui } from "./UI";

// GET posts on DOMLoad Auto
document.addEventListener("DOMContentLoaded", getPosts);

function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}
