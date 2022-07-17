const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

const saveToDos = () => {
	localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

const deleteToDo = (e) => {
	const li = e.target.parentElement;
	toDos = toDos.filter((todo)=> todo.id !== parseInt(li.id));
	li.remove();
	saveToDos();
}

const paintToDo = (newToDo) => {
	const li = document.createElement("li");
	li.id = newToDo.id;
	const span = document.createElement("span");
	span.innerText = newToDo.text;
	const button = document.createElement("button");
	button.innerText="";
	button.addEventListener("click", deleteToDo);
	li.appendChild(button);
	li.appendChild(span);
	toDoList.appendChild(li);
}

const handleToDoSubmit = (e) => {
  e.preventDefault();
	const newToDo = toDoInput.value;
	toDoInput.value = "";
	const newToDoObj = {
		text: newToDo,
		id: Date.now(),
	};
	toDos.push(newToDoObj);
	paintToDo(newToDoObj);
	saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null) {
	const parsedToDos = JSON.parse(savedToDos);
	toDos = parsedToDos;
	parsedToDos.forEach((item) => paintToDo(item));
}