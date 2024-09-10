document.addEventListener('DOMContentLoaded', function() {
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');
  const addTaskBtn = document.getElementById('addTaskBtn');

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Function to display tasks
  const displayTasks = () => {
    taskList.innerHTML = ''; // Clear existing tasks

    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.classList.toggle('completed', task.completed);

      li.innerHTML = `
        <span>${task.name}</span>
        <div class="task-btns">
          <button class="complete">${task.completed ? 'Undo' : 'Complete'}</button>
          <button class="edit"><i class="fas fa-edit"></i></button>
          <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
      `;

      // Event listener for complete/undo
      li.querySelector('.complete').addEventListener('click', () => toggleComplete(index));

      // Event listener for delete
      li.querySelector('.delete').addEventListener('click', () => deleteTask(index));

      // Event listener for edit
      li.querySelector('.edit').addEventListener('click', () => editTask(index));

      taskList.appendChild(li);
    });

    // Save updated tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  // Function to add a task
  const addTask = () => {
    const taskName = taskInput.value.trim();

    if (taskName === '') {
      alert('Please enter a task.');
      return;
    }

    tasks.push({ name: taskName, completed: false });
    taskInput.value = '';
    displayTasks();
  };

  // Add task when "Add" button is clicked
  addTaskBtn.addEventListener('click', addTask);

  // Add task when "Enter" key is pressed
  taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Toggle task completion
  const toggleComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
  };

  // Delete task
  const deleteTask = (index) => {
    tasks.splice(index, 1);
    displayTasks();
  };

  // Edit task
  const editTask = (index) => {
    const newTaskName = prompt('Edit task:', tasks[index].name);
    if (newTaskName !== null && newTaskName.trim() !== '') {
      tasks[index].name = newTaskName.trim();
      displayTasks();
    }
  };

  // Display tasks on page load
  displayTasks();
});
