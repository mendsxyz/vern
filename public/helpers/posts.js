// Post form

const post = {
  form: document.querySelector(".post-form form"),
  ct: document.querySelector(".post-form form .post-content")
}

let id_ = localStorage.getItem("addedBodyId");
id_ ? id_ = [] : (id_ = JSON.parse(id_));

const ct = {
  header: post.form.querySelector("#postHeader"),
  body: post.form.querySelector("#postBody"),
  addImage: post.form.querySelector("#addImage"),
  addText: post.form.querySelector("#addText")
}

post.form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const textareas = {
    header: document.querySelector("#postHeaderTextarea").textContent,
    body: document.querySelector("#postBodyTextarea").textContent,
    images: document.querySelectorAll(".output")
  }

  const addedBodies = {};
  id_.forEach((id) => {
    const textarea = document.querySelector(`#postBodyTextarea-${id}`);
    if (textarea) {
      addedBodies[`body${id}`] = textarea.textContent;
    }
  })

  ct.header.value = textareas.header;
  ct.body.value = textareas.body;

  Object.keys(addedBodies).forEach((key) => {
    const addedBodyInput = post.form.querySelector(`#postBody-${key.replace('body', '')}`);
    if (addedBodyInput) {
      addedBodyInput.value = addedBodies[key];
    }
  });
  
  const addedBody = Object.values(addedBodies).join("\n");

  // alert(ct.header.value + "\n" + ct.body.value + "\n" + addedBody);
  
  const newPost = {
    "id": Math.floor(500 * Math.random()).toFixed(0),
    "header": ct.header.value,
    "body": ct.body.value + "\n" + addedBody,
    "images": textareas.images.forEach(img => img.outerHTML), //? textareas.images.forEach(img => img.getAttribute("src")) : "no image src found",
    "impressions": 0,
    "likes": 0,
    "favorites": 0
  }
  
  console.log(newPost);
});

// Adding images

ct.addImage.addEventListener("click", () => {
  const id = Math.floor(500 * Math.random()).toFixed(0);
  
  let imageUpload = `
    <div class="image-upload w-full flex items-center justify-center flex-col gap-3">
      <input type="file" accept="image/*" class="image-inp" id="image-${id}" style="display: none;">
      <div class="w-full flex items-center justify-center gap-2">
        <label for="image-${id}" class="flex items-center justify-center px-6 py-2 bg-red-300 gap-2 rounded-lg">
          <span class="text-2sm font-normal">Upload image</span>
          <span class="ms-rounded sm">ios_share</span>
        </label>
        <button class="remove-image w-10 h-10 rounded-full border border-2 border-red-300 flex items-center justify-center">
          <span class="ms-rounded text-red-300 font-bold">close</span>
        </button>
      </div>
      <img class="output w-full rounded-lg">
    </div>
  `;
  
  post.ct.insertAdjacentHTML("beforeend", imageUpload);

  const imageInp = post.ct.querySelectorAll(".image-inp");
  const imageOutput = post.ct.querySelectorAll(".output");

  const loadFile = function(event) {
    const index = Array.prototype.indexOf.call(imageInp, event.target);
    imageOutput[index].src = URL.createObjectURL(event.target.files[0]);
  };

  imageInp.forEach((inp, index) => {
    inp.addEventListener("change", loadFile);
  });
  
  // Removing images
  
  post.ct.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-image")) {
      const imageBlobToRemove = e.target.closest(".image-upload");
      imageBlobToRemove.remove();
    }
  })
});

// Adding textbox

ct.addText.addEventListener("click", () => {
  const id = Math.floor(500 * Math.random()).toFixed(0);
  id_.push(id);
  localStorage.setItem("addedBodyId", JSON.stringify(id_));

  let newTextbox = `
    <input type="text" name="Post body" id="postBody-${id}" hidden>
    <div id="postBodyTextarea-${id}" class="w-full bg-gray-100 pl-3 py-2 h-40 border-l border-solid font-light" contenteditable="true"></div>
  `;
  
  post.ct.insertAdjacentHTML("beforeend", newTextbox);
});