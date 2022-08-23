const userImage = document.getElementById("users-img");
const displayText = document.getElementById("message");
const h2 = document.getElementById("h2");
const userBtn = document.getElementById("btn");
const navIcons = document.getElementById("nav-icons");
const allBtns = document.getElementsByTagName("i");

class Users {
  async getItems() {
    const response = await fetch("index.json");
    const data = await response.json();
    let users = data.items;
    users = users.map((items) => {
      const { name, email, age, address, phone, password, img } = items.fields;
      const { id } = items.sys;
      const image = items.fields.image.fields.file.url;
      return { name, email, age, address, phone, password, id, image, img };
    });
    return users;
  }
}
class UI {
  displayRandomUser(users) {
    let randomGen = Math.floor(Math.random() * 20) + 1;
    let tempUser = users.filter((user) => {
      if (user.id === randomGen) return user;
    });
    let item = tempUser[0];
    return item;
  }
}

userBtn.addEventListener("click", function () {
  Load();
});

function Load() {
  let item = {};
  const user = new Users();
  const ui = new UI();
  user.getItems().then((user) => {
    item = ui.displayRandomUser(user);
    displayText.innerHTML = "My name is";
    h2.textContent = item.name;
    allBtns[0].style.color = "#49a6e9";
    userImage.innerHTML = `<div class="user-card-top-bg" id="users-img">
        <div class="outer">
        <div class="user-card-img" id="user-img"></div>
        </div>
        </div>`;
    setTimeout(() => {
      const userImg = document.getElementById("user-img");
      userImg.style.background = `url(${item.image}) center/cover no-repeat`;
    }, 100);
  });
  navIcons.addEventListener("click", (event) => {
    for (i = 0; i < allBtns.length; i++) {
      if (i === parseInt(event.target.dataset.id)) {
        event.target.style.color = "#49a6e9";
      } else {
        allBtns[i].style.color = "rgba(70, 70, 145, 0.562)";
      }
    }
    switch (event.target.dataset.id) {
      case "0":
        displayText.innerHTML = "My name is";
        h2.textContent = item.name;
        break;
      case "1":
        displayText.innerHTML = "My email is";
        h2.textContent = `${item.email}`;
        break;
      case "2":
        displayText.innerHTML = "My age is";
        h2.textContent = `${item.age}`;
        break;
      case "3":
        displayText.innerHTML = "My street is";
        h2.textContent = `${item.address}`;
        break;
      case "4":
        displayText.innerHTML = "My phone is";
        h2.textContent = `${item.phone}`;
        break;
      case "5":
        displayText.innerHTML = "My password is";
        h2.textContent = `${item.password}`;
        break;
    }
  });
}
window.onload = Load();
