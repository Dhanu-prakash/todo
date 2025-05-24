

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let taskList = document.querySelector("#myList");


//We need a html renderer;


function render(){
    taskList.innerText = "";

    for(let i = 0 ;i<tasks.length;i++){
        let li = document.createElement("li");
        li.textContent = tasks[i] + "";

        //lets render delete button

        let delBtn = document.createElement("button");
        delBtn.textContent = "DELETE";
        delBtn.classList.add("delBtn");

        delBtn.addEventListener("click",function(){
            tasks.splice(i,1);
            localStorage.setItem("tasks",JSON.stringify(tasks));
            render();
        })
        li.appendChild(delBtn);
        taskList.appendChild(li);
        
    }
}

//Add task
document.querySelector("#addBtn").addEventListener("click",function(){
    let input = document.querySelector("input");
    let inputText = input.value.trim();
    if(inputText!==""){
        tasks.push(inputText);
        localStorage.setItem("tasks",JSON.stringify(tasks));
        render();
    }
    input.value = "";
})

render();