//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById("new-task");
var addButton=document.querySelector(".task-form__button");
var incompleteTaskHolder=document.getElementById("incomplete-tasks");
var completedTasksHolder=document.getElementById("completed-tasks");


var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");
    listItem.classList.add("task");

    //input (checkbox)
    var checkBox=document.createElement("input");
    checkBox.type="checkbox";
    checkBox.classList.add("task__checkbox");
    //label
    var label=document.createElement("label");
    label.innerText=taskString;
    label.classList.add("task__label");
    //input (text)
    var editInput=document.createElement("input");
    editInput.type="text";
    editInput.classList.add("task__input");
    //button.edit
    var editButton=document.createElement("button");
    editButton.innerText="Edit"; 
    editButton.classList.add("task__button", "task__button--edit");

    //button.delete
    var deleteButton=document.createElement("button");
    deleteButton.classList.add("task__button", "task__button--delete");
    var deleteButtonImg=document.createElement("img");
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.classList.add("task__button-image")
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector('.task__input');
    var label=listItem.querySelector(".task__label");
    var editBtn=listItem.querySelector(".task__button--edit");
    var containsClass=listItem.classList.contains("task--edit-mode");
    if(containsClass){
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    } else {
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }
    listItem.classList.toggle("task--edit-mode");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    listItem.classList.add("task--completed");
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    listItem.classList.remove("task--completed");
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");

    var checkBox=taskListItem.querySelector(".task__checkbox");
    var editButton=taskListItem.querySelector(".task__button--edit");
    var deleteButton=taskListItem.querySelector(".task__button--delete");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}