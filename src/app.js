//Module Object Instances brought in
import { http } from "./Http";
import { ui } from "./UI";

// GET posts on DOMLoad Auto
document.addEventListener("DOMContentLoaded", getPosts);

// Add post listener
document.querySelector(".post-submit").addEventListener("click", submitPost);

//Delete post listener
document.querySelector("#posts").addEventListener("click", deletePost);

// Edit State listener (via Event Delegation [parent=#post])
document.querySelector("#posts").addEventListener("click", enableEdit);

// Cancel Edit listener
document.querySelector(".card-form").addEventListener("click", cancelEdit);

function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

function submitPost() {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;
  const id = document.querySelector("#id").value;

  // Key = Value hence can use ES6
  const data = {
    title,
    body
  };

  // Input Validation
  if (title === "" || body === "") {
    ui.showAlert("Please fill in all fields", "alert alert-danger");
  } else {
    if (id === "") {
      //Create a post
      http
        .post("http://localhost:3000/posts", data)
        .then(data => {
          ui.showAlert("Post added", "alert alert-success");
          ui.clearFields();
          getPosts();
        })
        .catch(err => console.log(err));
    } else {
      //Update the post
      http
        .put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          ui.showAlert("Post updated", "alert alert-success");
          ui.changeFormState("add");
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
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
  e.preventDefault();
  ui.clearFields();
}

// Enable edit State
function enableEdit(e) {
  if (e.target.parentElement.classList.contains("edit")) {
    const postsContainer = document.getElementById("postsContainer");
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body
    };

    // Fill form with current post
    ui.fillForm(data);
    postsContainer.scrollIntoView(true);
    // window.location.hash = ui.titleInput.id;
  }
  e.preventDefault();
}

// Cancel Edit State (via Event Delegation)
function cancelEdit(e) {
  if (e.target.classList.contains("post-cancel")) {
    ui.changeFormState("add");
  }
  e.preventDefault();
}
