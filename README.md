# Desarrollo Móvil - GamerLog 🎮

## 👥 Integrantes

- Guillermo Valenzuela
- Lucas Garcia Carrera

## 📖 Descripción

Una aplicación móvil simple que consume una API de juegos. Dentro de la aplicación podemos ver la lista de juegos, guardarlos y darles una reseña.

## API Utilizada

La API que utilizamos para esta aplicación es:
- https://rawg.io/apidocs

Credits to: © RAWG, Behind The Games

## Estructura Utilizada

- app/ - Pantallas y rutas: Cada archivo es una pantalla
    - games: Agrupa listado y detalle
    - mylist: Agrupa la lista y el formulario
- components/ - Piezas reutilizables. Card para juegos (GameCard), un botón reutilizable (AppButton) y el EmptyState que es una pantalla de sección 
- constants/ - Solo un archivo theme.ts para colores y estilos base
- hooks/ - Para manejar el state, la validación y el guardado del formulario
- services/ - Para manejar la API.
    - rawg.service.ts: trae los juegos de la API.
    - storage.service.ts: manejo del storage.
- types/ - Para definir los tipos




## 📱 Pantallas

- __Inicio:__ logo de acceso rápido a explorar y a tu lista, y un bloque de actividad reciente (Esto estará guardado en el storage del dispositivo).

- __Explorar:__ Barra de búsqueda + listado de juegos populares desde la API de RAWG con rating y género.

- __Detalle:__ Info del juego (plataforma, descripción, rating de RAWG) y un botón para agregar a tu lista (storage).

- __Mi lista:__ Todos los juegos guardados, con tu puntaje personal, estrellas y reseña resumida.

- __Puntuar/Reseña:__ Formulario controlado con estrellas interactivas, estado del juego y campo de reseña, este es el que cumple el requerimiento del formulario del TP.

## ⚙️ Instalación y ejecución

### 1. Clonar el repositorio

`bash`
git clone https://github.com/GaugeZich/GamerLog.git

### 2. Movernos adentro del directorio

`bash`
cd gamerlog

### 3. Iniciar el proyecto

`bash`
npx expo start

### 4. Conexión al proyecto

Dentro de Expo Go (Si no cuenta con la aplicación móvil debe descargarla desde Google Play/App Store) le damos a "Scan QR code" y escaneamos el código QR que se genera al iniciar el proyecto.



## 📚 Tecnologías

- React Native


## 🖌️ Diseños

Diseños realizados en la aplicación Canva:
- https://canva.link/fbja2aabqph227j