document.addEventListener('DOMContentLoaded', function () {
    const newTodoInput = document.getElementById('new-todo');
    const todoList = document.getElementById('todo-list');
    const todoCount = document.getElementById('todo-count');
    const clearCompletedButton = document.getElementById('clear-completed');
    const filters = document.querySelectorAll('#filters button');
    const toggleAllButton = document.getElementById('toggle-all');

    let todos = [];
    let currentFilter = 'all';

    function renderTodos() {
        todoList.innerHTML = '';
        const filteredTodos = todos.filter(todo => {
            if (currentFilter === 'active') return !todo.completed;
            if (currentFilter === 'completed') return todo.completed;
            return true;
        });

        filteredTodos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = todo.completed ? 'completed' : '';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', () => toggleTodo(index));

            const label = document.createElement('label');
            label.textContent = todo.text;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '❌';
            deleteButton.addEventListener('click', () => deleteTodo(index));

            li.appendChild(checkbox);
            li.appendChild(label);
            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });

        updateTodoCount();
    }

    function addTodo(text) {
        todos.push({ text, completed: false });
        renderTodos();
    }

    function deleteTodo(index) {
        todos.splice(index, 1);
        renderTodos();
    }

    function toggleTodo(index) {
        todos[index].completed = !todos[index].completed;
        renderTodos();
    }

    function updateTodoCount() {
        const count = todos.filter(todo => !todo.completed).length;
        todoCount.textContent = `${count} item${count !== 1 ? 's' : ''} left`;
    }

    function clearCompleted() {
        todos = todos.filter(todo => !todo.completed);
        renderTodos();
    }

    function setFilter(filter) {
        currentFilter = filter;
        filters.forEach(button => button.classList.remove('selected'));
        document.getElementById(`filter-${filter}`).classList.add('selected');
        renderTodos();
    }

    newTodoInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && newTodoInput.value.trim()) {
            addTodo(newTodoInput.value.trim());
            newTodoInput.value = '';
        }
    });

    clearCompletedButton.addEventListener('click', clearCompleted);

    toggleAllButton.addEventListener('click', function () {
        const allCompleted = todos.every(todo => todo.completed);
        todos.forEach(todo => todo.completed = !allCompleted);
        renderTodos();
    });

    filters.forEach(button => {
        button.addEventListener('click', function () {
            setFilter(this.id.replace('filter-', ''));
        });
    });

    renderTodos();
});