fetch("data/posts.json")
  .then((response) => response.json())
  .then((json) => console.log(json.id));
  

const el = {
  navmenu: document.querySelector(".navmenu"),
  navmenu_toggle: document.querySelector(".navmenu-toggle")
}

el.navmenu_toggle.addEventListener("click", () => {
  el.navmenu.classList.toggle("visible");
})