function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskCategory = document.getElementById("taskCategory");
    const taskPriority = document.getElementById("taskPriority");
    const taskDueDate = document.getElementById("taskDueDate");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task.");
        return;
    }

    const taskList = document.getElementById("taskList");

    const li = document.createElement("li");
    li.classList.add("task-item");

    const taskDetails = document.createElement("div");
    taskDetails.classList.add("task-details");

    const taskInfo = document.createElement("div");
    taskInfo.classList.add("task-info");

    const taskText = document.createElement("span");
    taskText.textContent = `Task: ${taskInput.value}`;
    taskInfo.appendChild(taskText);

    const category = document.createElement("span");
    category.textContent = `Category: ${taskCategory.value}`;
    taskInfo.appendChild(category);

    const priority = document.createElement("span");
    priority.textContent = `Priority: ${taskPriority.value}`;
    taskInfo.appendChild(priority);

    const dueDate = document.createElement("span");
    dueDate.textContent = `Due Date: ${taskDueDate.value}`;
    taskInfo.appendChild(dueDate);

    taskDetails.appendChild(taskInfo);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("task-buttons");

    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.classList.add("complete");
    completeButton.onclick = () => {
        li.classList.toggle("completed");
    };

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    deleteButton.onclick = () => {
        taskList.removeChild(li);
    };

    buttonsDiv.appendChild(completeButton);
    buttonsDiv.appendChild(deleteButton);

    taskDetails.appendChild(buttonsDiv);

    li.appendChild(taskDetails);

    taskList.appendChild(li);

    taskInput.value = "";
    taskCategory.value = ""; 
    taskPriority.value = ""; 
    taskDueDate.value = "";
    taskInput.focus();
}

function sortTasksByDate() {
    const taskList = document.getElementById("taskList");
    const tasks = Array.from(taskList.getElementsByTagName("li"));

    tasks.sort((a, b) => {
        const aDate = new Date(a.querySelector(".task-info span:nth-child(4)").textContent.replace("Due Date: ", ""));
        const bDate = new Date(b.querySelector(".task-info span:nth-child(4)").textContent.replace("Due Date: ", ""));
        return aDate - bDate;
    });

    taskList.innerHTML = "";
    tasks.forEach(task => taskList.appendChild(task));
}

function sortTasksByPriority() {
    const taskList = document.getElementById("taskList");
    const tasks = Array.from(taskList.getElementsByTagName("li"));

    const priorityOrder = {
        "Low": 1,
        "Medium": 2,
        "High": 3
    };

    tasks.sort((a, b) => {
        const aPriority = a.querySelector(".task-info span:nth-child(3)").textContent.replace("Priority: ", "");
        const bPriority = b.querySelector(".task-info span:nth-child(3)").textContent.replace("Priority: ", "");
        return priorityOrder[bPriority] - priorityOrder[aPriority];
    });

    taskList.innerHTML = "";
    tasks.forEach(task => taskList.appendChild(task));
}

function filterTasks() {
    const filterCategory = document.getElementById("filterCategory").value;
    const filterPriority = document.getElementById("filterPriority").value;
    const filterStatus = document.getElementById("filterStatus").value;

    const taskList = document.getElementById("taskList");
    const tasks = Array.from(taskList.getElementsByTagName("li"));

    tasks.forEach(task => {
        const taskCategory = task.querySelector(".task-info span:nth-child(2)").textContent.replace("Category: ", "");
        const taskPriority = task.querySelector(".task-info span:nth-child(3)").textContent.replace("Priority: ", "");
        const isCompleted = task.classList.contains("completed");
        const taskStatus = isCompleted ? "Completed" : "Pending";

        let showTask = true;

        if (filterCategory !== "All" && filterCategory !== taskCategory) {
            showTask = false;
        }
        if (filterPriority !== "All" && filterPriority !== taskPriority) {
            showTask = false;
        }
        if (filterStatus !== "All" && filterStatus !== taskStatus) {
            showTask = false;
        }

        task.style.display = showTask ? "" : "none";
    });
}
