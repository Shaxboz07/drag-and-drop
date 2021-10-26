const database = [
  {
    title: "home",
    tasks: ["cleaning", "washing"],
  },
  {
    title: "coding",
    tasks: ["learn js", "learn css", "learn c++"],
  },
  {
    title: "qwerty",
    tasks: ["hello"],
  },
];

function loopData() {
  let columnText = "";
  database.forEach(function (value, index) {
    columnText += `
        <div class="column">
            <button class="delete-column" onclick="deleteColumn(${index})">
                <img src="./icons/x-circle.svg" alt="">
            </button>
            <div class="column-title">${value.title}</div>
            <div class="tasks-wrapper">
                ${loopTasks(value.tasks, index)}
            </div>

            <div class="add-task-box">
                <input  class="draggable-${index}" draggable="true" type="text" placeholder="Add task">
                <button onclick="addTask(${index})" class="button-handle-${index}">add</button>
            </div>
        </div>
        `;
  });

  columnText += `
    <div class="column">
        <div class="add-task-box">
            <input class="draggable" draggable="true" type="text" placeholder="Add column">
            <button onclick="addColumn()">add</button>
        </div>
    </div>
    `;

  document.querySelector(".container").innerHTML = columnText;
}

loopData();

function loopTasks(tasks, cIndex) {
  let tasksText = "";
  tasks.forEach(function (value, index) {
    tasksText += `
        <div class="containerc">
            <div class="draggable" draggable="true">
                ${value}
            </div>
           
        </div>
        `;
  });
  return tasksText;
}

function addColumn() {
  const inputValue = document.querySelector(".add-column-input").value;

  const column = {
    title: inputValue,
    tasks: [],
  };

  database.push(column);

  loopData();
}

function deleteColumn(index) {
  database.splice(index, 1);
  loopData();
}

function addTask(index) {
  const inputValue = document.querySelector(`.draggable-${index}`).value;
  database[index].tasks.push(inputValue);

  loopData();
}

function deleteTask(cIndex, index) {
  database[cIndex].tasks.splice(index, 1);
  loopData();
}

// let cars = ["matiz","tico"]
// console.log(cars);
// cars.push("malibu")
// console.log(cars);

function updateClicked(cIndex, index) {
  // updateClicked()
  document.querySelector(`.draggable-${cIndex}`).value =
    database[cIndex].tasks[index];

  const button = document.querySelector(`.button-handle-${cIndex}`);

  button.innerHTML = "update";
  button.click = function () {
    updateTask(cIndex, index);
  };
}

function updateTask(cIndex,index){
   const inputValue = document.querySelector(`.task-input-${cIndex}`).value;


   database[cIndex].tasks.splice(index,1,inputValue)

   loopData()
}



const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.containerc')

draggables.forEach(draggable =>{
    draggable.addEventListener('dragstart',() =>{
        draggable.classList.add('dragging')
    })

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })
})

containers.forEach(containerc => {
    containerc.addEventListener('dragover', e =>{
        e.preventDefault()
        const afterElement = getDragAfterElement(containerc, e.clientY)
        const draggable = document.querySelector('.dragging');
        if(afterElement == null){
            containerc.appendChild(draggable)
        } else {
            containerc.insertBefore(draggable, afterElement)
        }
    })
})


function getDragAfterElement(containerc, y){
   const draggableElements = [...containerc.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
       const box = child.getBoundingClientRect()
       const offset = y - box.top - box.height / 2 
    //    console.log(offset);
       if(offset < 0 && offset > closest.offset) {
           return { offset: offset, element:child}
       }else {
           return closest
           }
       
   } ,{offset:Number.NEGATIVE_INFINITY}).element
}
