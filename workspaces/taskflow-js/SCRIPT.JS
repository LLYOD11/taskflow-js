const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list'); 

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const li = document.createElement('li'); 
    li.textContent = taskText;

    li.addEventListener('click', () => {
        li.classList.toggle('completed'); 
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        taskList.removeChild(li); 
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    taskInput.value = '';
});