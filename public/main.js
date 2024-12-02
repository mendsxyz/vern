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

let maxHeaderLength = 70;
let maxBodyLength = 59;

function forYouPost(obj) {
  return `
    <div class="post-card p-4 grid grid-flow-row grid-cols-1 content-start justify-start gap-2 w-full" data-post="${obj.id}">
      <div class="w-full flex items-center justify-left gap-2">
        <img src="${obj.author_pfp}" alt="author's profile icon" class="author-pfp">
        <div class="author-name text-sm">${obj.author_name}</div>
      </div>
      <div class="w-full flex items-center justify-between gap-4">
        <div class="w-full grid grid-flow-row gap-2">
          <div class="post-header-uncut" hidden>${obj.header}</div>
          <div class="post-body-uncut" hidden>${obj.body}</div>
          
          <div class="post-header text-xl font-semibold leading-header">${obj.header.length > maxHeaderLength ? obj.header.substring(0, maxHeaderLength) + "..." : obj.header}</div>
          <div class="post-body text-sm font-light leading-snug">${obj.body.length > maxBodyLength ? obj.body.substring(0, maxBodyLength) + "..." : obj.body}</div>
        </div>
        <img class="post-image" src="assets/post-img/post-img.png" alt="post image">
      </div>
      <div class="w-full flex items-center justify-between">
        <div class="w-full flex items-center justify-left gap-4">
          <div class="impressions flex items-center justify-left gap-0">
            <span class="ms-rounded xs">bar_chart</span>
            <div class="text-xs font-light">${obj.impressions}</div>
          </div>
          <div class="likes flex items-center justify-left gap-1">
            <span class="ms-rounded xs thumb">thumb_up</span>
            <div class="text-xs font-light likes-count">${obj.likes}</div>
          </div>
          <div class="favorites flex items-center justify-left gap-0">
            <span class="ms-rounded xs fav">bookmark</span>
            <div class="text-xs font-light fav-count">${obj.favorites}</div>
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

// Full post content

const fullContent = document.querySelector(".full-content");

const collapseContent = fullContent.querySelector(".collapse-content");

let content;

fetch("https://jsonkeeper.com/b/MBJ5")
  .then((response) => response.json())
  .then(data => {
    renderCards(data);

    // Expanding fyp posts

    const fypCards = document.querySelectorAll(".post-card");

    fypCards.forEach(card => {
      card.addEventListener("click", (e) => {
        fullContent.classList.add("active");

        const elements = {
          id: card.dataset.post,
          author_pfp: card.querySelector(".author-pfp").getAttribute("src"),
          author_name: card.querySelector(".author-name").textContent,
          header: card.querySelector(".post-header-uncut").textContent,
          body: card.querySelector(".post-body-uncut").textContent,
          img: card.querySelector(".post-image").getAttribute("src"),

          impressions: card.querySelector(".impressions").outerHTML,
          likes: card.querySelector(".likes").outerHTML,
          favorites: card.querySelector(".favorites").outerHTML
        }

        content = `
          <div class="content-blob grid grid-flow-row gap-4" data-post="${elements.id}">
            <div class="w-full flex items-center justify-left gap-3">
              <img src="${elements.author_pfp}" alt="author's profile photo" class="w-1/6 rounded-full">
              <div class="grid grid-flow-row content-start justify-start gap-1">
                <span class="text-2sm font-medium">${elements.author_name} • <a href="#" class="text-red-600">Follow</a></span>
                <span class="text-sm font-light">Posted 2 days ago</span>
              </div>
            </div>
            
            <div class="w-full grid grid-flow-row content-start justify-start gap-2">
              <span class="text-2xl font-semibold leading-header">${elements.header}</span>
              <span class="text-3sm font-light">${elements.body}</span>
              <img src="${elements.img}" alt="post image" class="w-full rounded my-4">
            </div>
            
            <div class="w-full bg-white border-t border-solid px-16 py-4 flex items-center justify-between gap-4 fixed bottom-0 left-0">
              ${elements.impressions}
              ${elements.likes}
              ${elements.favorites}
            </div>
          </div>
        `;

        fullContent.insertAdjacentHTML("beforeend", content);

        // Liking content

        const thumbs = fullContent.querySelectorAll(".likes .thumb");

        thumbs.forEach(thumb => {
          let clicked = false;

          thumb.addEventListener("click", (e) => {
            thumb.classList.toggle("ms-filled");

            if (clicked) {
              const card = e.target.closest(".content-blob");

              if (card) {
                const postId = card.dataset.post;
                const matchingObj = Object.values(data).find(p => p.id == postId);
                matchingObj.likes -1;

                const likesCount = card.querySelector(".likes-count");

                likesCount.textContent = matchingObj.likes -1;
              } else {
                console.log("Not found!");
              }
            } else {
              clicked = true;

              const card = e.target.closest(".content-blob");

              if (card) {
                const postId = card.dataset.post;
                const matchingObj = Object.values(data).find(p => p.id == postId);
                matchingObj.likes += 1;
                
                const jsonData = JSON.stringify(matchingObj, null, 2);
                const encodedJsonData = btoa(jsonData);
                
                const token = "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";
                
                fetch("", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: encodedJsonData
                })
                .then(response => response.json())
                .then(updatedData => console.log(updatedData))
                .catch(error => console.log("An error occurred!\n" + error));

                const likesCount = card.querySelector(".likes-count");

                likesCount.textContent = matchingObj.likes;
              } else {
                console.log("Not found!");
              }
            }
          })
        });

        // Favoriting content

        const favs = fullContent.querySelectorAll(".favorites .fav");

        favs.forEach(fav => {
          fav.addEventListener("click", () => {
            fav.classList.toggle("ms-filled");
          })
        });

        // Collapsing full content

        collapseContent.addEventListener("click", () => {
          fullContent.classList.remove("active");

          const existing = {
            content: document.querySelector(".content-blob")
          }

          if (existing.content) {
            existing.content.remove();
          }
        })
      })
    })
  });