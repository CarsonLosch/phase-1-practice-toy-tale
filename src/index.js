let addToy = false;
const toyCollection = document.getElementById("toy-collection");
const toyLikeBtn = document.querySelectorAll("button.like-btn");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM CONTENT LOADED");
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector(".add-toy-form");
  const toyLikeBtn = document.querySelectorAll("button.like-btn");
  console.log(toyLikeBtn)
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  //GETing toy cards to the DOM
  addToys();
  //POSTing a new toy to db.json
  toyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addNewToy(event.target.name.value, event.target.image.value); // passing in event values/input values to the variables name, url in addNewToy()
  });
  //Patching Likes/ updating likes to the DOM
  document.querySelectorAll('button.like-btn').addEventListener('click', event => {
    console.log(event);
  })
  
});

function addToys() {
  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((toy) => {
        toyCollection.innerHTML += `<div class="card">
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>${toy.likes} Likes</p>
      <button class="like-btn" id="${toy.id}">Like ❤️</button> 
      </div>`;
      });
    });
}

function addNewToy(name, url) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: name, //variable contains event value of first input in the event listener
      image: url, //variable contains event value of 2nd input in the event listener
      likes: 0,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      addToys(data);
    })
    .catch((error) => {
      console.error("Error!", error);
    });
}
/*
function Liker() {

}

function patchLikes() {
  fetch('http://localhost:3000/toys', {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "id":
      "likes":
    }),
  })
  .then(response => response.json())
  .then(data => {

  })
} */
