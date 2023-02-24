const form = document.querySelector("#itemForm");
const itemInput = document.querySelector("#itemInput");
const itemList = document.querySelector("#itemList");
const messageDiv = document.querySelector("#message");
const clearButton = document.querySelector("#clearBtn");
const filters = document.querySelectorAll(".nav-item");

let todoItems = [];

function handleitem(itemData) {
  const items = document.querySelectorAll(".list-group-item");
  items.forEach((item) => {
    console.log("aisi");
    console.log(item.querySelector(".title").getAttribute("data-time"));
    console.log(itemData.addat);
    if (
      item.querySelector(".title").getAttribute("data-time") == itemData.addat
    ) {
      console.log("aisi1");
      item.querySelector("[data-done]").addEventListener("click", function (e) {
        e.preventDefault();
        const itemIndex = todoItems.indexOf(itemData);
        const currentItem = todoItems[itemIndex];
        currentItem.isdone = currentItem.isdone ? false : true;
        todoItems.splice(itemIndex, 1, currentItem);
        setlocalstorage(todoItems);
      });
      //delete
      item
        .querySelector("[data-delete]")
        .addEventListener("click", function (e) {
          e.preventDefault();
          itemList.removeChild(item);
          const removeIndex = todoItems.indexOf(itemData);
          todoItems.splice(removeIndex, 1);
          setlocalstorage(todoItems);
        });
    }
  });
}

function getList(todoItems) {
  itemList.innerHTML = "";
  console.log(todoItems.length);
  if (todoItems.length > 0) {
    todoItems.forEach((item) => {
      if (item.isdone == true) {
        itemN = `<del>${item.name}</del>`;
      } else {
        itemN = `${item.name}`;
      }
      itemList.insertAdjacentHTML(
        "beforeend",
        `<li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="title" data-time="${item.addat}">${itemN}</span> 
            <span>
                <a href="#" data-done><i class="bi bi-check-circle green"></i></a>
                <a href="#" data-delete><i class="bi bi-x-circle red"></i></a>
            </span>
          </li>`
      );
      handleitem(item);
    });
  } else {
    console.log("nai");
  }
}

function setlocalstorage(todoItems) {
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
  getlocalstorage();
}

function getlocalstorage() {
  todostorage = localStorage.getItem("todoItems");
  if (todostorage == "undefine" || todostorage == null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(todostorage);
  }
  console.log(todoItems);
  getList(todoItems);
}
document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const itemname = itemInput.value.trim();
    if (itemname.length == 0) {
    } else {
      const itemobj = {
        name: itemname,
        isdone: false,
        addat: new Date().getTime(),
      };
      console.log(itemname);
      todoItems.push(itemobj);
      setlocalstorage(todoItems);
      //showAlert("New item has been added.", "alert-success");
    }
    console.log(itemname);
  });
  getlocalstorage();
});
