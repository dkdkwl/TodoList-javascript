//유저가 값을 입력한다.
// +버ㅡㄴ을 클릭하면, 할일이 추가된다.
// delete버튼을 누르면 할일이 삭제된다.
//check버튼을 누르면 할일이 끝나면서 밑줄이 간다.
//1. check 버튼을 클릭하는 순간 true false
//2. true이면 끝난걸로 간주하고 밑줄 보여주기
// 3. false 이면 안끄ㅌ난걸로 알고 간주하고 보야주기
//진행중 끝남 탭을 누르면, 언더바가 이동한다.
//끝남탭은, 끝난아이템만, 진행중탭은 진행중인 아이템만
//전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.querySelector(".task-input");
let addButton = document.querySelector(".button-add");
let tabs = document.querySelectorAll(".tab-type div");
let mode = '';
let filterList = [];
let taskList = [];


for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){
        filter(event);
    });
}

addButton.addEventListener("click",addTask);

function addTask(){
    let task = {
        id : randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete : false
    }
    taskList.push(task);
    render();
}

function render(){
    let list = [];
    if(mode == "all"){
        list = taskList;
    }else if(mode == "ongoing"){
        console.log("111")
        list = filterList;
    }
    let resultHTML = '';
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `
            <div id="task-board"><div class="task" id="">
                <div class="task-done">${list[i].taskContent}</div>
                <div class="button-box">
                <button><i class="fa fa-check" onClick="toggleComplete('${list[i].id}')" aria-hidden="true"></i></button>
                <button><i class="fa fa-trash" onClick="deleteTask('${list[i].id}');" aria-hidden="true"></i></button>
                </div>
            </div></div> `
        }else{
            resultHTML += `
            <div id="task-board"><div class="task" id="">
                <div class="">${list[i].taskContent}</div>
                <div class="button-box">
                <button><i class="fa fa-check" onClick="toggleComplete('${list[i].id}')" aria-hidden="true"></i></button>
                <button><i class="fa fa-trash" onClick="deleteTask('${list[i].id}');"aria-hidden="true"></i></button>
                </div>
            </div></div> `
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
}

function deleteTask(id){
    for(let i=0; i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    render();    
}

function filter(event){
    mode = event.target.id;
    if(mode == "all"){
        render();
    }else if(mode == "ongoing"){
        for(let i=0; i<taskList.length;i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            }
        }
        taskList = filterList;
        render();
    }
    console.log(taskList);
    console.log(filterList);

}

function randomIDGenerate(){
    return "_" + Math.random().toString(36).substr(2, 9);
}

