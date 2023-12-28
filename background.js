const formItem = document.querySelector("#formItem");
const inputItem = document.querySelector("#inputItem");
const listItem = document.querySelector("#listItem");
const message = document.querySelector("#message");
const clearBtn = document.querySelector("#clearBtn");
const filters = document.querySelectorAll(".nav-item");

let todoItem = [];

const handleItem = (itemData) => {
  const items = document.querySelectorAll(".list-group-item");

  items.forEach((item) => {
    if (
      item.querySelector(".title").getAttribute("data-time") == itemData.addat
    ) {
      item.querySelector("[data-done]").addEventListener("click", (e) => {
        e.preventDefault();

        const indexItem = todoItem.indexOf(itemData);
        const currentItem = todoItem[indexItem];

        currentItem.isdone = currentItem.isdone ? false : true;

        todoItem.splice(indexItem, 1, currentItem);

        setLocalStorage(todoItem);
      });

      // PERF: delete a single todo item
      item
        .querySelector("[data-delete]")
        .addEventListener("click", (e) => {
          e.preventDefault();

          listItem.removeChild(item);

          const removeIndex = todoItem.indexOf(itemData);

          todoItem.splice(removeIndex, 1);

          setLocalStorage(todoItem);
        });
    }
  });
}

const getTodoList = (todoItems) => {
  listItem.innerHTML = "";

  if (todoItems.length > 0) {
    todoItems.forEach((item) => {
      if (item.isdone == true) {
        item = `<del>${item.name}</del>`;
      } else {
        item = `${item.name}`;
      }

      listItem.insertAdjacentHTML(
        "beforeend",
        `<li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="title" data-time="${item.addat}">${item}</span> 
            <span>
                <a href="#" data-done><i class="bi bi-check-circle green"></i></a>
                <a href="#" data-delete><i class="bi bi-x-circle red"></i></a>
            </span>
          </li>`,
      );

      handleItem(item);
    });
  } else {
    console.log("No items found!");
  }
}

const setLocalStorage = (todoItems) => {
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
  getLocalStorage();
}

const getLocalStorage = () => {
  todostorage = localStorage.getItem("todoItems");
  if (todostorage == "undefine" || todostorage == null) {
    todoItem = [];
  } else {
    todoItem = JSON.parse(todostorage);
  }
  console.log(todoItem); // NOTE: log to the console to see our todo item being added to the browser storage for conciseness.
  getTodoList(todoItem);
}

document.addEventListener("DOMContentLoaded", () => {
  formItem.addEventListener("submit", (e) => {
    e.preventDefault();

    const itemName = inputItem.value.trim();

    if (itemName.length == 0) {
      return
    } else {
      const itemObject = {
        name: itemName,
        isdone: false,
        addat: new Date().getTime(),
      };
      console.log(itemName);
      todoItem.push(itemObject);
      setLocalStorage(todoItem);
      // TODO: showAlert("New item has been added.", "alert-success");
    }
    console.log(itemName);
  });
  getLocalStorage();
});
