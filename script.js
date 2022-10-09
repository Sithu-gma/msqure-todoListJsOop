const form=document.querySelector("[data-form]");
const lists=document.querySelector("[data-lists]");
const input=document.querySelector("[data-input]");

//empty arr
let todoArr=[];


form.addEventListener('submit',e => {
    e.preventDefault();
    let id=Math.random()*100000;
    const todo= new Todo(id,input.value);
    todoArr=[...todoArr, todo];
    console.log(todoArr);
    UI.displayData();
    UI.clearInput();
    UI.removeTodo();
});
//make obj instance

class Todo {
    constructor(id,todo){
        this.id=id;
        this.todo=todo;
    }
}

//display the todo in the DOM;
class UI {
    static displayData(){
        let displayData=todoArr.map((item)=>{
            return `
                    <div class="todo">
                    <p>${item.todo}</p>
                    <span class="remove" data-id=${item.id}>X</span>
                    </div>
                    `
            });
        lists.innerHTML=(displayData).join(" ");
    }
    static clearInput () {
        input.value="";
    }
    static removeTodo() {
        lists.addEventListener('click',e=>{
            if(e.target.classList.contains('remove')){
                e.target.parentElement.remove();
            }
                let btnId=e.target.dataset.id;
                
                //remove from array
                UI.removeArrayTodo(btnId);
        })

    }
    static removeArrayTodo(id) {
    
        todoArr=todoArr.filter(item => item.id !== +id);
    }
}