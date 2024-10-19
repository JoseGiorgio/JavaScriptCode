$(document).ready(function () {
    const apiKey = '70220184d32f26132298caf7a5af751d'; // API key de OpenWeatherMap
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    let ciudades = [];

     // Funcion para renderizar las ciudades en el select
     function actualizarSelect(ciudades) {
        $('#citySelect').empty();
        ciudades.forEach(ciudad => {
            $('#citySelect').append(`<option value="${ciudad}">${ciudad}</option>`);
        });
        $('#citySelect').trigger('change'); // Refresca el select2 despues de agregar las opciones
    }

    fetch('ciudades.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); 
    })
    .then(provincias => {
        console.log(provincias)
        const nombresCiudades = provincias.flatMap(provincia => 
            provincia.ciudades.map(ciudad => ciudad.nombre)
        );
        ciudades = nombresCiudades;
        actualizarSelect(nombresCiudades)
    })
    .catch(error => {
        console.error('Hubo un problema con la solicitud:', error);
    });
   

    // Inicializa Select2 en el select
    $('#citySelect').select2({
        placeholder: "Selecciona una ciudad",
        allowClear: true
    });

    // Foco automatico en el campo de busqueda al abrir el select
    $(document).on('select2:open', () => {
        document.querySelector('.select2-search__field').focus(); // Enfoque en el campo de busqueda
    });

    // Manejar el evento de tecla al presionar Enter en el select
    $(document).on('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // Evitar el comportamiento predeterminado
            $('#fetchWeatherBtn').click(); // Ejecutar el clic del botón
        }
    });

    // Funcion para renderizar las ciudades en el select
    function actualizarSelect(ciudades) {
        $('#citySelect').empty();
        ciudades.forEach(ciudad => {
            $('#citySelect').append(`<option value="${ciudad}">${ciudad}</option>`);
        });
        $('#citySelect').trigger('change'); // Refresca el select2 despues de agregar las opciones
    }

    // Inicializa el select con todas las ciudades
    actualizarSelect(ciudades);

    // Array de imagenes de clima
    const climaImagenes = [
        { description: 'cielo claro', image: 'imagenes/sol.png' },
        { description: 'pocas nubes', image: 'imagenes/nube.png' },
        { description: 'nubes dispersas', image: 'imagenes/nube.png' },
        { description: 'nubes rotas', image: 'imagenes/nube.png' },
        { description: 'nubes', image: 'imagenes/nube.png' },
        { description: 'lluvia ligera', image: 'imagenes/lluvia.png' },
        { description: 'lluvia', image: 'imagenes/lluvia.png' },
        { description: 'tormenta', image: 'imagenes/lluvia.png' },
        { description: 'nieve', image: 'imagenes/nieve.png' },
        { description: 'neblina', image: 'imagenes/neblina.png' }
    ];

    // Manejar la consulta del clima al hacer clic en el boton
    $('#fetchWeatherBtn').click(function () {
        const ciudadSeleccionada = $('#citySelect').val();
        if (!ciudadSeleccionada) {
            alert("Por favor selecciona una ciudad.");
            return;
        }

        // Mostrar mensaje de carga
        $('#weatherInfo').removeClass('d-none').removeClass('alert-danger').addClass('alert-info').html('Consultando el clima...');

        // Hacer solicitud AJAX a la API de OpenWeatherMap
        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'json',
            data: {
                q: ciudadSeleccionada + ",AR", // Ciudad seleccionada de Argentina
                appid: apiKey,
                units: "metric",
                lang: "es"
            },
            success: function (response) {
                let weatherData = `
                    <h3>Clima en ${response.name}</h3>
                    <p>Temperatura: ${response.main.temp}°C</p>
                    <p>Clima: ${response.weather[0].description}</p>
                    <p>Humedad: ${response.main.humidity}%</p>
                    <p>Viento: ${response.wind.speed} km/h</p>
                `;
                
               // Determinar la hora actual
               const horaActual = new Date().getHours();
               let imagen = '';

               // Determinar que imagen mostrar segun la descripcion y la hora
               const climaDescription = response.weather[0].description;
               const clima = climaImagenes.find(c => c.description === climaDescription) || { image: '' };
               debugger

               if (clima.image) {
                   imagen = clima.image;
               }

               // Agregar condiciones para el dia/noche
              

               // Mostrar la informacion del clima
               $('#weatherInfo').removeClass('alert-info').addClass('alert-success').html(weatherData);
               
               // Mostrar la imagen del clima en un div centrado
               $('#imageContainer').html(`<div class="text-center"><img src="${imagen}" alt="${climaDescription}" style="margin-top: 10px;"></div>`);
            },
            error: function () {
                $('#weatherInfo').removeClass('alert-info').addClass('alert-danger').html('No se pudo obtener el clima. Verifica el nombre de la ciudad.');
                $('#imageContainer').html(''); // Limpiar la imagen en caso de error
            }
        });
    });
});
