// Post form

const post = {
  form: document.querySelector(".post-form form"),
  components: document.querySelector(".post-form .post-components"),
  add_image: document.querySelector(".add-image"),
  image_upload: document.querySelector("#imageUpload"),
  image_display: document.querySelector("#imageDisplay"),
  add_body: document.querySelector(".add-body"),

  json_visualizer: document.querySelector(".json-visualizer")
}

// POST_JSON

const post_json = {
  "id": Math.floor(5000 * Math.random()).toFixed(0),
  "header": "",
  "subtitle": "",
  "image": "",
  "body": "",
}

// Add image

post.add_image.addEventListener("click", () => {

});

post.image_upload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    post.image_display.src = e.target.result;
  };

  reader.readAsDataURL(file);
});

// Extra body

post.add_body.addEventListener("click", (e) => {
  e.preventDefault();

  const newBody = ` 
    <div class="body w-full border border-solid"> 
      <input type="text" id="bodyText" hidden> 
      <div id="bodyTextarea" class="w-full px-3 py-2 font-light text-2sm" contenteditable="true"></div> 
    </div> 
  `;

  post.components.insertAdjacentHTML("beforeend", newBody);
});

let extraBodyCount = 0;

function addExtraProperty() {
  extraBodyCount = 0;

  const bodyTextareas = document.querySelectorAll("#bodyTextarea:not(.main-body-textarea)");

  bodyTextareas.forEach((textarea) => {
    if (textarea.textContent.trim() !== "") {
      extraBodyCount++;
      const propName = `extra_body_${extraBodyCount}`;
      post_json[propName] = textarea.textContent;
    }
  });

  localStorage.setItem("post_json", JSON.stringify(post_json));
}

// Posting

post.form.addEventListener("submit", (e) => {
  e.preventDefault();

  extraBodyCount++;

  const header = document.querySelector("#headerTextarea").textContent;
  const subtitle = document.querySelector("#subtitleTextarea").textContent;
  const image = document.querySelector("#imageDisplay").getAttribute("src");
  const body = document.querySelector("#bodyTextarea").innerText;

  post_json.header = header;
  post_json.subtitle = subtitle;
  post_json.image = image;
  post_json.body = body + "<br>";

  addExtraProperty();

  const json_html = document.querySelector(".json-to-html");

  const json_html_header = json_html.querySelector(".header-text");
  json_html_header.textContent = post_json.header;

  const json_html_subtitle = json_html.querySelector(".subtitle-text");
  json_html_subtitle.textContent = post_json.subtitle;

  const json_html_image = json_html.querySelector(".image-display");
  json_html_image.setAttribute("src", post_json.image);

  const json_html_body = json_html.querySelector(".body-text");
  json_html_body.innerHTML = post_json.body;

  // Loop through extra_body properties and append them to json_html_body
  
  for (let i = 1; i <= extraBodyCount; i++) {
    const extraBodyProp = `extra_body_${i}`;
    if (post_json[extraBodyProp]) {
      json_html_body.insertAdjacentText("beforeend", post_json[extraBodyProp]);
    }
  }

  post.json_visualizer.innerHTML = JSON.stringify(post_json);
});

// Get saved_post_json localStorage Object and overwrite post_json Object

const saved_post_json = localStorage.getItem("post_json");
if (saved_post_json) {
  post_json = JSON.parse(saved_post_json);
} else {
  console.warn("No saved post_json Object found");
}