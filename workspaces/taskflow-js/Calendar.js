const tasks = [
  {
    title: "Finish project report",
    dueDate: "2025-01-20",
    priority: "high",
    completed: false
  },
  {
    title: "Prepare presentation",
    dueDate: "2025-01-22",
    priority: "medium",
    completed: false
  },
  {
    title: "Read documentation",
    dueDate: "2025-01-25",
    priority: "low",
    completed: false
  }
];

const calendarContainer = document.getElementById("calendar-tasks");

function getAlertLevel(priority) {
  if (priority === "high") return "high";
  if (priority === "medium") return "medium";
  return "low";
}

function renderCalendarTasks() {
  calendarContainer.innerHTML = "";

  tasks.forEach(task => {
    const alertLevel = getAlertLevel(task.priority);

    const taskElement = document.createElement("div");
    taskElement.classList.add("calendar-task", `priority-${task.priority}`);

    taskElement.innerHTML = `
      <div class="task-info">
        <span class="task-title">${task.title}</span>
        <span class="task-date">Due: ${task.dueDate}</span>
      </div>
      <span class="alert alert-${alertLevel}">
        ${alertLevel.toUpperCase()} ALERT
      </span>
    `;

    calendarContainer.appendChild(taskElement);
  });
}

renderCalendarTasks();