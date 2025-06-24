# Ejercicio: Crear una To-Do List con HTML, CSS y JavaScript

## Objetivo
Construir una aplicación web sencilla que permita al usuario:

- Agregar tareas
- Marcarlas como completadas
- Eliminarlas de la lista

## Requisitos

### HTML
Crea una interfaz que contenga:

- Un campo de entrada de texto (`input`) para escribir nuevas tareas.
- Un botón para agregar la tarea a la lista.
- Una sección (`<ul>` o `<div>`) donde se mostrarán las tareas.

### JavaScript
Implementa las siguientes funcionalidades:

- Al hacer clic en el botón, la tarea escrita en el input debe agregarse a la lista.
- Cada tarea debe mostrarse con:
  - El texto de la tarea
  - Un botón para marcarla como “completada” (cambia su estilo, por ejemplo, tachado)
  - Un botón para eliminarla de la lista

### Validaciones

- No permitir agregar tareas vacías.
- Eliminar correctamente la tarea al hacer clic en el botón correspondiente.

## Extras (opcional)

- Permitir presionar **Enter** para agregar tareas.
- Guardar las tareas en `localStorage` para que se mantengan al recargar la página.
- Mostrar cuántas tareas hay pendientes.
