let todos = [];
const newTodoForm = document.querySelector("#new-todo-form");

newTodoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let todo = {
    content: e.target.elements.content.value,
    category: e.target.elements.category.value,
    isDone: false,
  };

  if (todo.content.charAt(0) == " " || todo.content.charAt(0) == "")
    return alert("You got empty fields");

  todos.push(todo);

  let counterEl = document.querySelector("#counter");
  counterEl.innerText = `(${todos.length})`;

  createTodo();
});

function createTodo() {
  let input = document.querySelector("input");
  input.value = "";

  const todoList = document.querySelector("#todo-list");
  todoList.innerHTML = "";

  todos.forEach((item) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const deleteButton = document.createElement("button");

    input.type = "checkbox";

    span.classList.add("bubble");

    if (item.category == "personal") {
      span.classList.add("personal");
    } else {
      span.classList.add("business");
    }

    content.classList.add("todo-content");
    actions.classList.add("actions");
    edit.classList.add("edit");
    deleteButton.classList.add("delete");

    content.innerHTML = `<input type="text" value="${item.content}" readonly>`;
    edit.innerHTML = "Edit";
    deleteButton.innerHTML = "Delete";

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteButton);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);
    todoList.appendChild(todoItem);

    input.checked = item.isDone;

    if (item.isDone) {
      todoItem.classList.add("done");
    }

    input.addEventListener("change", (e) => {
      item.isDone = e.target.checked;

      if (item.isDone) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }

      console.log(todos);
      createTodo();
    });

    edit.addEventListener("click", (e) => {
      let input = content.querySelector("input");
      todoItem.classList.remove("done");
      todoItem.classList.add("editInput");
      item.isDone = false;
      input.removeAttribute("readonly");
      input.select();

      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        item.content = e.target.value;
        createTodo();
      });
    });

    deleteButton.addEventListener("click", (e) => {
      todos = todos.filter((i) => i != item);
      updateCounter();
      createTodo();
    });
  });
}

const updateCounter = () => {
  let counterEl = document.querySelector("#counter");
  counterEl.innerHTML = `(${todos.length})`;
};

console.log(todos);
