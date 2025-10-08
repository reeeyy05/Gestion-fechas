// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Creamos el contenedor principal
    const contenedor = document.createElement('div');
    contenedor.id = 'contenedor-principal';
    contenedor.style.textAlign = 'center';
    contenedor.style.fontFamily = 'Arial, sans-serif';
    document.body.appendChild(contenedor);

    // Título
    const titulo = document.createElement('h1');
    titulo.textContent = 'Cuenta Atrás para tu Cumpleaños';
    contenedor.appendChild(titulo);

    // Pequeño mensaje para que el usuario sepa qué hacer
    const mensaje = document.createElement('p');
    mensaje.textContent = 'Selecciona tu fecha de cumpleaños:';
    mensaje.style.marginBottom = '10px';
    contenedor.appendChild(mensaje);

    // Input de la fecha
    const fechaEntrada = document.createElement('input');
    fechaEntrada.type = 'date';
    fechaEntrada.style.marginBottom = '20px';
    contenedor.appendChild(fechaEntrada);

    // Contador
    const contador = document.createElement('div');
    contador.id = 'cuenta-atras';
    contador.style.fontSize = '24px';
    contador.style.margin = '20px';
    contenedor.appendChild(contador);

    // Variable para la fecha objetivo
    let fechaObjetivo = null;

    // Función para actualizar el contador
    function actualizarContador() {
        if (!fechaObjetivo) {
            contador.textContent = 'Seleccione una fecha';
            contador.style.color = 'black';
            return;
        }

        const hoy = new Date();
        const diferencia = fechaObjetivo - hoy; // Diferencia en milisegundos

        if (diferencia <= 0) {
            contador.textContent = '¡Esa fecha ya ha pasado!';
            contador.style.color = 'red';
            return;
        }

        const segundosTotales = Math.floor(diferencia / 1000); // Convertimos a segundos
        const segundos = segundosTotales % 60; // Obtenemos segundos restantes
        const minutosTotales = Math.floor(segundosTotales / 60); // Convertimos a minutos
        const minutos = minutosTotales % 60; // Obtenemos minutos restantes
        const horasTotales = Math.floor(minutosTotales / 60); // Convertimos a horas
        const horas = horasTotales % 24; // Obtenemos horas restantes
        const diasTotales = Math.floor(horasTotales / 24); // Convertimos a días
        const meses = Math.floor(diasTotales / 30); // Aproximación a los meses
        const dias = diasTotales % 30; // Días restantes

        contador.textContent = `${meses} meses, ${dias} días, ${horas} horas, ${minutos} minutos, ${segundos} segundos`;

        // Determinar el color del contador
        if (diasTotales < 7) {
            contador.style.color = 'red'; // Menos de una semana
        } else if (diasTotales < 30) {
            contador.style.color = 'orange'; // Menos de un mes
        } else {
            contador.style.color = 'green'; // Más de un mes
        }
    }

    // Actualización inicial
    actualizarContador();

    // Actualizar cada segundo
    setInterval(actualizarContador, 1000);

    // Evento para poder cambiar la fecha
    fechaEntrada.addEventListener('change', () => {
        const fechaNueva = new Date(`${fechaEntrada.value}T00:00:00`); // Añadimos hora para precisión
        if (!isNaN(fechaNueva)) {
            fechaObjetivo = fechaNueva;
            actualizarContador();
        }
    });
});