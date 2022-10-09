const form=document.querySelector("[data-form]");
const list=document.querySelector("[data-lists]");
const input=document.querySelector("[data-input]");
//empty Arr
let todoArr=[];
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
                    <span>Del</span>
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
            if(e.target.classList.contains(remove)){
                e.target.parentElement.remove();
            }
            let btnId=e.target.dataset.id;
            Ui.removeArrayTodo(btnId);
        });
    }
    static removeArrayTodo(id){
        todoArr=todoArr.filter(item=> item.id !== +id:);
    }
}