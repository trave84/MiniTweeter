//Module Object Instances brought in
import { http } from "./Http";
import { ui } from "./UI";

// GET posts on DOMLoad Auto
document.addEventListener("DOMContentLoaded", getPosts);

// Add post listener
document.querySelector(".post-submit").addEventListener("click", submitPost);

//Delete post listener
document.querySelector("#posts").addEventListener("click", deletePost);

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

function deletePost(e) {
  e.preventDefault();

  // Event propagation UP
  if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id;
    if (confirm("Are you sure to delete?")) {
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert("Post deleted", "alert alert-success");

          getPosts();
        })
        .catch(err => consolo.log(err));
    }
  }
}
