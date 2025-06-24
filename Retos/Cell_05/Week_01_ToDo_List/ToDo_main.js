let input = document.querySelector(".inputList input");
let ul = document.querySelector(".list");

input.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    addTask();
  }
});

const addTask = () => {
    let valueTask = input.value.trim();
    valueTask = capitalizeFirstLetter(valueTask);
    
    if (valueTask === ""){
        notification("⚠️ Error: You have to type something!","#d90429",4000)
    } else {

        let li = document.createElement("li");   
        li.classList.add("task");

        let div = document.createElement("div");
        div.classList.add("headTask");

        let btnDelete = document.createElement("button");

        let text = document.createTextNode(valueTask);

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        checkbox.addEventListener("change", () => taskCompleted(checkbox, li));
        btnDelete.addEventListener("click", () => deleteTask(li));

        div.appendChild(checkbox);
        div.appendChild(text);
        li.appendChild(div);
        li.appendChild(btnDelete);
        ul.appendChild(li)        
    }

    input.value = "";
}

const taskCompleted = (checkbox, li) => {
  if (checkbox.checked) {
    li.classList.add("checked");
  } else {
    li.classList.remove("checked");
  }
}

const deleteTask = (li) => {
  li.remove();
}

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const notification = (text, color, duration) =>{
    Toastify({
        text: text,
        duration: duration,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {background: color}
        }).showToast();
}