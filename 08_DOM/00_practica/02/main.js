    let count = 1
    const addElements = () => {
      const ulList = document.getElementById("list");
      const li = document.createElement("li");
      li.textContent = `Element ${count}`
      ulList.appendChild(li)
      count ++; 
    }