class UI {
  constructor() {
    this.post = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.postSubmit = document.querySelector(".post-submit");
    this.forState = "add";
  }

  showPosts(posts) {
    let output = "";

    posts.forEach(post => {
      output += `
      <div class="card mb-3">
        <div class="card-body">
          <h4 class="card-title">${post.title}</h4>
          <p class="card-text">${post.body}</p> 
          <a href="#" class="edit card-link" data-id="${post.id}">
            <i class="fa fa-pencil"></i>
          </a> 
          <a href="#" class="delete card-link" data-id="${post.id}">
            <i class="fa fa-remove"></i>
          </a> 
        </div>
      </div>
      `;
    });

    this.post.innerHTML = output;
  }

  showAlert(msg, className) {
    this.clearAlert();

    const div = document.createElement("div");
    div.className = className;

    div.appendChild(document.createTextNode(msg));

    // Parent
    const container = document.querySelector(".postsContainer");

    const posts = document.querySelector("#posts");

    // Insert BEFORE the actual post
    container.insertBefore(div, posts);

    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const currAlert = document.querySelector(".alert");

    if (currAlert) {
      currAlert.remove();
    }
  }

  clearFields() {
    this.titleInput.value = "";
    this.bodyInput.value = "";
  }

  // FIll form to edit
  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFormState("edit");
  }

  //Clear ID hidden value
  clearIdInput() {
    this.idInput.value = "";
  }

  // Change the form State
  changeFormState(type) {
    if (type === "edit") {
      // Change the state of propertyVar [.post-submit]
      this.postSubmit.textContent = "Update Post";
      this.postSubmit.className = "post-submit btn btn-warning btn-block";

      // Create cancel btn
      const btn = document.createElement("button");
      btn.className = "post-cancel btn btn-light btn-block";
      btn.appendChild(document.createTextNode("Cancel Edit"));

      // Get parent
      const cardForm = document.querySelector(".card-form");
      // Get elm to insert before
      const formEnd = document.querySelector(".form-end");
      cardForm.insertBefore(btn, formEnd);
    } else {
      this.postSubmit.textContent = "Posted";
      this.postSubmit.className = "post-submit btn btn-primary btn-block";

      // Remove cancel btn IF it is there
      if (document.querySelector(".post-cancel")) {
        document.querySelector(".post-cancel").remove();
      }
      //Clear that ID from hidden field
      this.clearIdInput();
      //Clear text
      this.clearFields();
    }
  }
}

export const ui = new UI();
