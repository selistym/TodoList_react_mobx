import mobservable from 'mobservable';

// Create a reactive data structure
export var todos = mobservable.makeReactive([]);

// The following function will automatically be executed whenever 'todos' changes
mobservable.sideEffect(() => {
	console.log("Completed %d of %d todo items", todos.filter(todo => todo.completed).length, todos.length)
});

addTodo("Find a clean mug");
// Prints: 'Completed 0 of 1 todo items'
addTodo("Make coffee");
// Prints: 'Completed 0 of 2 todo items'
todos[0].completed = true;
// Prints: 'Completed 1 of 2 todo items'

export function addTodo(title) {
	todos.push({
		title: title,
		completed: false
	});
}

export function removeTodo(todo) {
	todos.splice(todos.indexOf(todo), 1);
}

/** How to do something async: */
mobservable.defineReactiveProperties(todos, { isLoading: 0 });

export function loadTodosAsync() {
	todos.isLoading++;
	// mimic something asynchronous
	setTimeout(function() {
		addTodo("Asynchronously created todo");
		addTodo("Another asynchronously created todo");
		todos.isLoading--;
	}, 2000);
}
