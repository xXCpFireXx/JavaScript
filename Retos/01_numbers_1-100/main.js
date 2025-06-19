let putNumber = document.getElementById('numbers');

for (let index = 1; index <= 100; index++) {

    let infoText = '';

    if (index % 3 === 0 && index % 5 === 0) {
        infoText = 'FizzBuzz';
    } else if (index % 5 === 0) {
        infoText = 'Buzz';
    } else if (index % 3 === 0) {
        infoText = 'Fizz';
    } else {
        infoText = index;
    }

    /* console.log(index)  */

    // Agrego el texto al DOM
    const newElement = document.createElement('p');   // crea un "objeto" que representa el nuevo párrafo
    newElement.textContent = infoText;                // Este paso le da contenido al párrafo que acabas de crear
    putNumber.appendChild(newElement);                // Agrega ese párrafo al contenedor en la página
}