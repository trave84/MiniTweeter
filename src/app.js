//Module Object Instances brought in
import { http } from "./Http";
import { ui } from "./UI";

// GET posts on DOMLoad Auto
document.addEventListener("DOMContentLoaded", getPosts);

// Add post listener
document.querySelector(".post-submit").addEventListener("click", submitPost);

function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

function submitPost() {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;

  // Key = Value hence can use ES6
  const data = {
    title,
    body
  };

  //Create a post
  http
    .post("http://localhost:3000/posts", data)
    .then(data => {
      ui.showAlert("Post added", "alert alert-success");
      ui.clearFields();
      getPosts();
    })
    .catch(err => console.log(err));
}
