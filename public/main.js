fetch("data/posts.json")
  .then((response) => response.json())
  .then((json) => console.log(json.id));

// Nav-menu and toggle

const nav = {
  navmenu: document.querySelector(".navmenu"),
  navmenu_toggle: document.querySelector(".navmenu-toggle")
}

nav.navmenu_toggle.addEventListener("click", () => {
  nav.navmenu.classList.toggle("visible");
});

// Reads tab switching

const tab = {
  btns: document.querySelectorAll(".content-tab"),
  content: document.querySelectorAll(".content")
}

tab.btns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    tab.btns.forEach(btn => btn.classList.remove("active"));
    btn.classList.contains("active") ?
      btn.classList.remove("active") :
      btn.classList.add("active");

    // Matching tabs

    tab.content.forEach(tab => tab.classList.remove("active"));

    tab.content.forEach(tab => {
      if (btn.dataset.tab == tab.dataset.tab) {
        tab.classList.add("active");
      }
    })
  })
});

// Render post cards in respective tab

function renderCards(data) {
  Object.values(data).forEach(obj => {
    const fypCardsBlob = forYouPost(obj);
    const favCardsBlob = favoritePost(obj);

    tab.content.forEach(tab => {
      tab.dataset.tab == "for-you" ?
        tab.insertAdjacentHTML("afterbegin", fypCardsBlob) :
        tab.insertAdjacentHTML("afterbegin", favCardsBlob);
    })
  })
}

// Post card html

let maxBodyLength = 59;

function forYouPost(obj) {
  return `
    <div class="post-card w-full p-4 grid grid-flow-row content-center justify-start gap-2">
      <div class="w-full flex items-center justify-left gap-2">
        <img src="${obj.author_pfp}" alt="user profile icon" class="user-profile-icon">
        <div class="author-post-info text-sm">${obj.author_name}</div>
      </div>
      <div class="w-full grid grid-flow-col items-center justify-start gap-4">
        <div class="w-full grid grid-flow-row gap-2">
          <div class="post-header text-2xl font-bold leading-none">${obj.header}</div>
          <div class="post-body text-sm font-light leading-snug">${obj.body.length > maxBodyLength ? obj.body.substring(0, maxBodyLength) + "..." : obj.body}</div>
        </div>
        <img class="post-image" src="assets/post-img/post-img.png" alt="post image">
      </div>
      <div class="w-full flex items-center justify-between">
        <div class="w-full flex items-center justify-left gap-4">
          <div class="flex items-center justify-left gap-0">
            <span class="ms-rounded xs">bar_chart</span>
            <div class="text-xs font-light">${obj.impressions}</div>
          </div>
          <div class="flex items-center justify-left gap-1">
            <span class="ms-rounded xs">thumb_up</span>
            <div class="text-xs font-light">${obj.likes}</div>
          </div>
          <div class="flex items-center justify-left gap-0">
            <span class="ms-rounded xs">bookmark</span>
            <div class="text-xs font-light">${obj.favorites}</div>
          </div>
        </div>
        <div class="items-center justify-left gap-0">
          <div class="flex items-center justify-left">
            <span class="add-to-favorites ms-rounded">add_circle</span>
          </div>
        </div>
      </div>
    </div>
  `
}

function favoritePost(obj) {
  return `
  
  `
}

fetch("data/posts.json")
  .then((response) => response.json())
  .then(data => renderCards(data));