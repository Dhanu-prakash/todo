const task =( JSON.parse(localStorage.getItem("tasks"))) || [];
let tasksList = document.querySelector("ul");
let currentFilter = "all";

function render(){
    tasksList.innerHTML = "";
    for(let i = 0 ; i < task.length; i++){

        if((currentFilter==="done" && task[i].done === false)||(currentFilter==="notdone" && task[i].done === true))continue;

        

        let li = document.createElement("li");
        li.textContent = task[i].name;

        let delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.classList.add("addBtn");
        delBtn.addEventListener("click",function(){
            task.splice(i,1);
            localStorage.setItem("tasks",JSON.stringify(task));
            render();
        })

        let filterStatus = document.createElement("button");
        filterStatus.classList.add("filterStatus");
        if(!task[i].done){
            filterStatus.textContent = "Not Yet!"
        filterStatus.style.backgroundColor="black";
        filterStatus.style.color="white";
        }
        else{
                filterStatus.textContent = "Yep Done!"
        filterStatus.style.backgroundColor="green";
        filterStatus.style.color="white";
        }
        
        filterStatus.addEventListener("click",function(){
            task[i].done = task[i].done === false ? true : false;
            filterStatus.style.backgroundColor= task[i].done === true ? "green":"black";
            filterStatus.textContent = task[i].done === true ? "Yep Done!" : "Not Yet!";
            
        })


        tasksList.appendChild(li);
        li.appendChild(filterStatus);
        li.appendChild(delBtn);
    }
}
render();

document.querySelector(".addBtn").addEventListener("click",function(){
    let text = document.querySelector(".input");
    let textValue = text.value.trim();
    if(textValue !== ""){
        task.push({name:textValue,done:false});
    localStorage.setItem("tasks",JSON.stringify(task));
    }
    
    text.value = "";
    render();
})

document.querySelector("#all").addEventListener("click",function(){
    currentFilter = "all";
    render();
})

document.querySelector("#notdone").addEventListener("click",function(){
    currentFilter = "notdone";
    
    render();
})

document.querySelector("#done").addEventListener("click",function(){
    currentFilter = "done";

    render();
})