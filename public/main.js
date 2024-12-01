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

function forYouPost(obj) {
  return `
    
  `
}

function favoritePost(obj) {
  return `
  
  `
}

fetch("data/posts.json")
  .then((response) => response.json())
  .then(data => renderCards(data));