document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from local storage on page load
  loadTasks();

  // Add task when button is clicked
  addButton.addEventListener("click", () => {
    addTask(taskInput.value);
  });

  // Add task when "Enter" key is pressed
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask(taskInput.value);
    }
  });

  // Function to add a task to the list
  function addTask(taskText, save = true) {
    taskText = taskText.trim();
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    const li = document.createElement("li");
    li.textContent = taskText;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");

    // Remove task from DOM and Local Storage
    removeBtn.onclick = function () {
      li.remove();
      removeTaskFromStorage(taskText);
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Save task to Local Storage
    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }

    taskInput.value = "";
  }

  // Function to load tasks from Local Storage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((task) => addTask(task, false));
  }

  // Function to remove a task from Local Storage
  function removeTaskFromStorage(taskText) {
    let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks = storedTasks.filter((task) => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
  }
});
