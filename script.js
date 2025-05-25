

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let taskList = document.querySelector("#myList");
//Variable for filtering 
let currentFilter = "all";

//We need a html renderer;


function render(){
    taskList.innerText = "";

    for(let i = 0 ;i<tasks.length;i++){
        if((currentFilter==="done" && tasks[i].done === false) || (currentFilter === "notdone" && tasks[i].done === true))continue//skip that iteration if tasks if the filter is set to done and the tasks isn't done dont show up in the render.


        let li = document.createElement("li");
        li.textContent = tasks[i].text + "";
        //lets render done button
        let statusBtn = document.createElement("button");
        statusBtn.classList.add("delBtn");
        statusBtn.textContent = tasks[i].done === true ? "Done" : "Not Yet!";
        statusBtn.style.backgroundColor = tasks[i].done === true ? "Green" : "Black";
        statusBtn.style.color = tasks[i].done === true ? "black" : "white";
        
        statusBtn.addEventListener("click",function(){
            tasks[i].done = tasks[i].done === false ? true : false;
            localStorage.setItem("tasks",JSON.stringify(tasks));
            render();
        })
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
        li.appendChild(statusBtn);
        taskList.appendChild(li);
        
    }
}

//Add Filter Buttons
document.querySelector("#filterAll").addEventListener("click",function(){
    currentFilter = "all";
    render();
})
document.querySelector("#filterDone").addEventListener("click",function(){
    currentFilter = "done";
    render();
})
document.querySelector("#filterAvailable").addEventListener("click",function(){
    currentFilter = "notdone";
    render();
})

//Add task
document.querySelector("#addBtn").addEventListener("click",function(){
    let input = document.querySelector("input");
    let inputText = input.value.trim();
    if(inputText!==""){
        tasks.push({text:inputText, done:false});//Push done as false cuz the task will be undone if we push a new task to the ul
        localStorage.setItem("tasks",JSON.stringify(tasks));
        render();
    }
    input.value = "";
})

