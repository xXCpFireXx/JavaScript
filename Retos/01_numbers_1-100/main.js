let listNumbers = document.getElementById("listNumbers");

for (let i = 1; i <= 100; i++) {
  let contentP = "";
  let newElementP = document.createElement("p");

  if (i % 3 == 0 && i % 5 == 0) {
    contentP = "FizzBuzz";
    newElementP.textContent = contentP;
    newElementP.style.color = "rgb(255, 255, 255)";
  } else if (i % 5 == 0) {
    contentP = "Buzz";
    newElementP.textContent = contentP;
    newElementP.style.color = "rgb(255, 255, 255)";
  } else if (i % 3 == 0) {
    contentP = "Fizz";
    newElementP.textContent = contentP;
    newElementP.style.color = "rgb(255, 255, 255)";
  } else {
    contentP = i;
    newElementP.textContent = contentP;
    newElementP.style.color = "rgb(242, 232, 207)";
  }
  listNumbers.appendChild(newElementP);
}
