
#  Ejercicio Práctico: Consulta del Clima con OpenWeatherMap

##  Enunciado:

Crea una **aplicación web sencilla** que permita al usuario consultar el clima actual de cualquier ciudad. El objetivo es trabajar con peticiones a APIs públicas, manejo del DOM, funciones asincrónicas, uso de `axios` y variables de entorno con `dotenv`.

##  Requisitos:

1. **Interfaz de Usuario:**
   - Un campo de texto donde el usuario pueda escribir el nombre de una ciudad.
   - Un botón que al hacer clic (o presionar Enter) inicie la búsqueda del clima.

2. **Consulta a la API:**
   - Utiliza la API de [OpenWeatherMap](https://openweathermap.org/current) para obtener el clima actual.
   - Realiza la petición utilizando **`axios`** y una **función asincrónica (`async/await`)**.

3. **Mostrar en el DOM los siguientes datos:**
   - Temperatura actual.
   - Humedad.
   - Velocidad del viento.
   - Hora del **amanecer** y del **atardecer** (convierte el valor UNIX a formato legible).

4. **Imagen dinámica del clima (Bonus):**
   - Muestra una imagen relacionada con el clima actual (por ejemplo, sol, lluvia, nieve, nubes), utilizando los íconos que entrega la propia API.

5. **Uso de variables de entorno (Bonus):**
   - Usa la librería **`dotenv`** para proteger tu clave de API (`API_KEY`). Esta debe ser cargada desde un archivo `.env`.

##  Consideraciones técnicas:

- Usa HTML, CSS y JavaScript
- Usa `axios` desde un archivo JS con `type="module"`.
- Maneja los errores apropiadamente (ciudad no encontrada, etc.).
- Puedes convertir los datos de tiempo UNIX a hora local usando:

  ```js
  new Date(timestamp * 1000).toLocaleTimeString();
  ```

##  Tips:

- Regístrate en [https://home.openweathermap.org/](https://home.openweathermap.org/) para obtener una **API key gratuita**.
- La URL base de consulta es:

  ```bash
  https://api.openweathermap.org/data/2.5/weather?q={CITY_NAME}&appid={API_KEY}&units=metric
  ```


