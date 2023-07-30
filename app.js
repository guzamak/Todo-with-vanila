//selector
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todofilter = document.querySelector(".filter-todo");



//function

const addTodo = (e) => {
  e.preventDefault(); 

  //tododiv
  const tododiv = document.createElement("div");
  tododiv.classList.add("todo");

  //todoli
  const todoli = document.createElement("li");
  todoli.innerHTML = `${todoInput.value}`;
  saveTodo(todoInput.value)
  todoli.classList.add("todo-item"); 

  //button
  const checkbutton = document.createElement("button");
  checkbutton.innerHTML ='<i class="fas fa-check"></i>'
  checkbutton.classList.add("complete-btn");

  const trash = document.createElement("button");
  trash.innerHTML ='<i class="fas fa-trash"></i>'
  trash.classList.add("trash-btn");



  tododiv.appendChild(todoli);
  tododiv.appendChild(checkbutton);
  tododiv.appendChild(trash);
  todoList.appendChild(tododiv); 

}  

const deleteCheck = (e) => {
  const item = e.target
  const todo = item.parentElement //tododiv
  switch(item.classList[0]) {
    case "trash-btn":
      todo.classList.add('fall')
      todo.addEventListener("transitionend", ()=>{ //trasition จบเกิด function
        todo.remove()
        deleteTodo(todo.childNodes[0].innerHTML)//childNodes เป็น array children เป็น obj หน้าตาเหมือน array 
      });
      break
    case "complete-btn":
      todo.classList.toggle("completed")
      break
    default:
      break
  }
}

const filterTodo = (e) => {
  const todos = todoList.childNodes//childernไม่เป็น childNode เป็น array
  todos.forEach(todo => {
    switch(e.target.value){
      case "completed":
        todo.classList.contains('completed')?todo.style.display="flex":todo.style.display="none"
        break
      case "uncompleted":
        todo.classList.contains('completed')?todo.style.display="none":todo.style.display="flex"
        break
      case "all":
        break

    }
  })


}

const saveTodo = (todo) => {
  let todos;
  JSON.parse(localStorage.getItem("todo"))?todos = JSON.parse(localStorage.getItem("todo")):todos = []
  localStorage.setItem("todo", JSON.stringify([...todos,todo]))
} 

const getTodo = () => {
  let todos = JSON.parse(localStorage.getItem("todo"))
  if(todos){
  todos.forEach(todo => {

  //tododiv
  const tododiv = document.createElement("div");
  tododiv.classList.add("todo");

  //todoli
  const todoli = document.createElement("li");
  todoli.innerHTML = `${todo}`;
  todoli.classList.add("todo-item"); 

  //button
  const checkbutton = document.createElement("button");
  checkbutton.innerHTML ='<i class="fas fa-check"></i>'
  checkbutton.classList.add("complete-btn");

  const trash = document.createElement("button");
  trash.innerHTML ='<i class="fas fa-trash"></i>'
  trash.classList.add("trash-btn");



  tododiv.appendChild(todoli);
  tododiv.appendChild(checkbutton);
  tododiv.appendChild(trash);
  todoList.appendChild(tododiv); 

  })
}}


const deleteTodo = (todo) => { //รับค่าที่ต้องการลบมา มีอีกวิธีคือใช้ div.key = index ตอนสร้าง เเล้วลบ ด้วย foreach เช็คว่ามี index ตัวไหนมากกว่า ตัวที่ลบ เเล้ว -1 index นั้น  
  let todos;
  JSON.parse(localStorage.getItem("todo"))?todos = JSON.parse(localStorage.getItem("todo")):todos = []
  todos.splice(todos.indexOf(todo), 1)
  localStorage.setItem("todo", JSON.stringify(todos))

}


//addevertlisteners

todoButton.addEventListener("click", addTodo )  
todoList.addEventListener("click", deleteCheck )
todofilter.addEventListener("click",  filterTodo )
document.addEventListener("DOMContentLoaded",getTodo)//ใช้หลัง element โหลด