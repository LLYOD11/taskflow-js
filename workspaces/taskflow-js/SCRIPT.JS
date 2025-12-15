// DOM Element References
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const taskTitleInput = document.getElementById('task-title');
const taskDescriptionInput = document.getElementById('task-description');
const dueDateInput = document.getElementById('task-due-date');
const taskPriorityInput = document.getElementById('task-priority');

// Constants for Priority Levels
const PRIORITY_COLORS = {
  Low: 'green',
  Medium: 'orange',
  High: 'red',
  Critical: 'darkred'
};

// Utility Functions
function getTimeRemaining(deadline) {
  const now = new Date();
  const dueDate = new Date(deadline);
  const timeDiff = dueDate - now;
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
  return { timeDiff, days, hours, minutes };
}

function formatTimeRemaining({ days, hours, minutes }) {
  return `${days}d ${hours}h ${minutes}m`;
}

// Create Task Item
function createTaskElement(task) {
  const { title, description, dueDate, priority } = task;

  const li = document.createElement('li');
  li.classList.add('task-item', priority.toLowerCase());
  li.style.borderLeftColor = PRIORITY_COLORS[priority];

  const titleDiv = document.createElement('div');
  titleDiv.textContent = title;
  titleDiv.classList.add('task-title');

  const descriptionDiv = document.createElement('div');
  descriptionDiv.textContent = description;
  descriptionDiv.classList.add('task-description');

  const dueDateDiv = document.createElement('div');
  dueDateDiv.textContent = `Due: ${new Date(dueDate).toLocaleString()}`;
  dueDateDiv.classList.add('task-due-date');

  const countdownDiv = document.createElement('div');
  countdownDiv.classList.add('countdown-timer');
  updateCountdown(countdownDiv, dueDate);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', () => taskList.removeChild(li));

  li.appendChild(titleDiv);
  li.appendChild(descriptionDiv);
  li.appendChild(dueDateDiv);
  li.appendChild(countdownDiv);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);
}

// Update Countdown Timer for Tasks
function updateCountdown(countdownElement, dueDate) {
  const { timeDiff, days, hours, minutes } = getTimeRemaining(dueDate);
  countdownElement.textContent = `Time left: ${formatTimeRemaining({ days, hours, minutes })}`;

  // Change visual status based on remaining time
  if (timeDiff <= 0) {
    countdownElement.parentElement.classList.add('overdue');
    countdownElement.textContent = 'Overdue!';
  } else if (timeDiff <= 24 * 60 * 60 * 1000) {
    countdownElement.parentElement.classList.add('due-soon');
  } else {
    countdownElement.parentElement.classList.add('on-track');
  }
}

// Add Task Button Click Handler
addTaskBtn.addEventListener('click', () => {
  const title = taskTitleInput.value.trim();
  const description = taskDescriptionInput.value.trim();
  const dueDate = dueDateInput.value;
  const priority = taskPriorityInput.value;

  if (!title || !dueDate) {
    alert('Please provide a task title and due date.');
    return;
  }

  const task = { title, description, dueDate, priority };
  createTaskElement(task);

  // Clear Input Fields
  taskTitleInput.value = '';
  taskDescriptionInput.value = '';
  dueDateInput.value = '';
  taskPriorityInput.value = 'Low'; // Reset to default
});

// Auto Update Countdown Timers Every Minute
setInterval(() => {
  const tasks = document.getElementsByClassName('countdown-timer');
  Array.from(tasks).forEach(timer => {
    const dueDate = new Date(timer.parentElement.querySelector('.task-due-date').textContent.replace('Due: ', ''));
    updateCountdown(timer, dueDate);
  });
}, 60 * 1000);