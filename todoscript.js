const clear = document.querySelector(".clear");
const listTitle = document.getElementById("list-title");
const list = document.getElementById("list");
const input = document.getElementById("input");
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "line-through";

let LIST, id;

let data = localStorage.getItem("TODO");
let name = localStorage.getItem("NAME");


if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    LoadList(name, LIST);
} else {
    LIST = [];
    id = 0;
}

if(name) {
	listTitle.value = name
}

function LoadList(name, array){
	listTitle.value = name
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

 clear.addEventListener("click", function(){
     localStorage.clear();
     location.reload();
 });


function addToDo(toDo, id, done, trash){

    if(trash){ return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `
                <li class="item">
                  <i class="far ${DONE}" job="complete" id="${id}"></i>
                  <p class="text ${LINE}">${toDo}</p>
                  <i class="fas fa-trash-alt" job="delete" id="${id}"></i>
                </li>
                `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

document.addEventListener("keyup",function(event){
    if(event.keyCode == 13){
        const toDo = input.value;

        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            id++;


    localStorage.setItem("TODO", JSON.stringify(LIST));

        }
        input.value  = "";
    }
});

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}


list.addEventListener("click", function(event){
	
    const element = event.target; 
    const elementJob = element.attributes.job.value; 

    if(elementJob == "complete"){
        completeToDo(element);
    } else if(elementJob == "delete"){
        removeToDo(element);
    }
    
    localStorage.setItem("TODO", JSON.stringify(LIST));

});

listTitle.addEventListener("change", function(event){
	localStorage.setItem("NAME", listTitle.value.trim())
});