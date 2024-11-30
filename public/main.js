fetch("data/posts.json")
  .then((response) => response.json())
  .then((json) => console.log(json.id));