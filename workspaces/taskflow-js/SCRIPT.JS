const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn')
const taskList = document.getElementBy('task-list')

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText==='') return;

    li.addEventListener('click', ()=>)
        li.classList.toglle('completed')});
    


const deleteBtn=document.createElement('button');
deleteBtn.textContent='delete';
deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        taskList.remove();
    }
);
li.appendChild(deleteBtn)
taskList.appendChild(li);
taskInput.value='';

