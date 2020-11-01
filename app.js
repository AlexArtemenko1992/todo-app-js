const container = document.querySelector(".container");
const form = document.querySelector(".form");
const inputText = document.querySelector(".input-text");
const activeList = document.querySelector(".active-list");
const doneList = document.querySelector(".done-list");

// Array of tasks
const taskList = [
  { id: 1, text: "Купить яблоки" },
  { id: 2, text: "Забрать деньги" },
];

// Serialize array to obj
const objOfTasks = taskList.reduce((acc, el) => {
  acc[el.id] = el;
  return acc;
}, {});

// Obj of done tasks
const doneTasksList = {};

// Events
form.addEventListener("submit", onSubmitHandler);
document.addEventListener("DOMContentLoaded", generateStaticTask(objOfTasks));

// Generate static tasks
function generateStaticTask(objOfTasks) {
  Object.values(objOfTasks).forEach((task) => {
    const template = `
    <li class="active-list_item col-12 m-auto" id='${task.id}'>
      ${task.text}
        <span class="btn-group-control">
            <button class="btn-delete">
              <i class="far fa-trash-alt"></i>
            </button>
        </span>
    </li>
  `;
    activeList.insertAdjacentHTML("afterbegin", template);
    deleteTask(objOfTasks);
    addToDoneList(objOfTasks);
  });
}

// Submit Handler
function onSubmitHandler(e) {
  e.preventDefault();
  const newTask = inputText.value;
  addNewTaskToObj(newTask);
  form.reset();
}

// Add new task to obj and HTML.
function addNewTaskToObj(task) {
  if (!task) {
    return;
  }
  const newTask = {
    id: Math.random(),
    text: task,
  };
  objOfTasks[newTask.id] = newTask;
  generateTask(newTask);
  deleteTask(objOfTasks);
  addToDoneList(objOfTasks);
}

// Generate new task
function generateTask(task) {
  const newTaskTemplate = `
    <li class="active-list_item col-12 m-auto" id='${task.id}'>
      ${task.text}
        <span class="btn-group-control">
            <button class="btn-delete">
              <i class="far fa-trash-alt"></i>
            </button>
        </span>
    </li>
  `;
  activeList.insertAdjacentHTML("afterbegin", newTaskTemplate);
}

// Delete handler
function deleteTask(objOfTasks) {
  const delBtn = document.querySelector(".btn-delete");
  delBtn.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("btn-delete") ||
      e.target.classList.contains("fa-trash-alt")
    ) {
      const li = e.target.closest("li");
      delete objOfTasks[li.id];
      li.remove();
    }
  });
}

// Add task to done-list
function addToDoneList(objOfTasks) {
  const allLi = document.querySelectorAll(".active-list_item");
  allLi.forEach((el) => {
    el.addEventListener("click", (e) => {
      const currentTask = objOfTasks[e.target.id];
      const li = e.target;
      delete objOfTasks[e.target.id];
      li.remove();
      doneTasksList[currentTask.id] = currentTask;
      console.log(doneTasksList);
      generateDoneTask(currentTask);
    });
  });
}
// Generate done task
function generateDoneTask(task) {
  const newTaskTemplate = `
    <li class="done-list_item col-12 m-auto" id='${task.id}'>
      ${task.text}
        <span class="btn-group-control">
          <i class="fas fa-check"></i>
        </span>
    </li>
  `;
  doneList.insertAdjacentHTML("afterbegin", newTaskTemplate);
}
