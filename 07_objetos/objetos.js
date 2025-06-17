// Objetos
let persona = {
    nombre: "Cristian",
    edad: 30,
    saludar: function() {
        console.log("Hola, soy " + this.nombre);
    }
};
persona.saludar();
