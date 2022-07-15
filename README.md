# Aplicativo preguntas y respuestas 

Aplicativo web para **laboratorio de Javascript Sofka C4**, consiste en un juego de  5 niveles con 5 opciones de preguntas por cada nivel, al pasar cada nivel las preguntas subiran de dificultad llegando asi hasta el final.

## Funcionamiento

- El usuario inicialmente debera agregar un nombre para identificarlo y guardar sus datos en `localstorage` por si accidentalmente cierra la pestaña o si desea continuar despues en el nivel que va actualmente.
- Se hara una peticion al servidor solicitando una pregunta con respecto a su nivel.
- Al recibir la pregunta correspondiente listara las opciones de respuesta en los botones dedicados de la aplicacion.
- Cuando el usuario seleccione una posible respuesta, se hara una peticion al servidor enviando la respuesta del usuario y el id de la pregunta para validar si ha sido correcta o no. El servidor devolvera 3 opciones con respecto a esa evaluacion:
    - 0 = El usuario respondio incorrectamente.
        - Se borraran los datos de niveles actuales asignando el nivel y puntaje por defecto. Nivel 1 y puntaje 0.
    - 1 = El usuario respondio correctamente.
        - Se guardara en el  localstorage el nivel nuevo, el puntaje y se cargada la siguiente pregunta.
    - 3 = El usuario finalizado el juego.
        - Se felicitara al usuario por su logro y los datos de niveles y puntajes seran borrados del localstorage para que inicie nuevamente.
- El usuario podra borrar sus datos almacenados desde el boton superior el cual tiene el icono de bote de basura.

En tu navegador preferido puedes ingresar [aqui](https://sofka-lavoratorio-js-c4.vercel.app/) para probar el juego.

## Instalacion
- Copia el proyecto con `git@github.com:Leonardo-Henao/sofka-lavoratorioJS-C4.git` para conexiones SSH o `https://github.com/Leonardo-Henao/sofka-lavoratorioJS-C4.git` para conexiones HTTPS.

- Abre el archivo `index.html` con tu navegador preferido. 
