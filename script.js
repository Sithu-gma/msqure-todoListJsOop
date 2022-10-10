const form=document.querySelector("[data-form]");
const list=document.querySelector("[data-lists]");
const input=document.querySelector("[data-input]");

class Storage {
    static addToStorage (todoArr) {
        let storage=localStorage.setItem("todo", JSON.stringify(todoArr));
        return storage;
    }
    static getToStorage () {
        let storage=localStorage.getItem("todo")===null? []:JSON.parse(localStorage.getItem("todo"));
        return storage;
    }
}
//empty Arr
let todoArr=Storage.getToStorage();
// fire button
form.addEventListener('submit', e=>{
    e.preventDefault();
    const id=Math.random()*10000;
    console.log(id);
    const todo=new Todo(id, input.value);
    todoArr=[...todoArr, todo];
    console.log("arr",todoArr);
    Ui.displayData();
    Ui.clearInput();
    Ui.removeTodo();
    
    Storage.addToStorage(todoArr);

});

//make obj instance
class Todo{
    constructor(id, todo){
        this.id=id;
        this.todo=todo;
    }
}
 // make ui list create divs

 class Ui {
    static displayData() {
        let displayData= todoArr.map(item=> {
            return `
                <div class="todo">
                    <p>${item.todo}</p>
                    <span class="remove" data-id=${item.id}>Del</span>
                </div>
            `
        })
        list.innerHTML=displayData.join("");
    }    
    static clearInput () {
        return input.value="";
    }
    static removeTodo (){
        list.addEventListener('click', e=>{
            if(e.target.classList.contains('remove')){
                e.target.parentElement.remove();
            }
            let btnId=e.target.dataset.id;
            Ui.removeArrayTodo(btnId);
        });
    }
    static removeArrayTodo(id){
        todoArr=todoArr.filter(item=> item.id !== +id);
        Storage.addToStorage(todoArr);
    }
}

window.addEventListener('DOMContentLoaded', ()=>{

    Ui.displayData();
    // remove from the dom
    Ui.removeTodo();
})