// Datos iniciales
let altura = 0; // Altura inicial de la planta
let dias = 5; // Número de días a simular

function estado(dia) {
    console.log(`Día ${dia}: La planta mide ${altura} cm`);
}

function crecer(mucho) {
    if (mucho) {
        altura += 3; // Crece 3 cm si se riega
    } else {
        altura += 1; // Crece solo 1 cm si no se riega
    }
}

for (let dia = 1; dia <= dias; dia++) {
    let decision = prompt(`Día ${dia}: ¿Quieres regar la planta? (sí/no)`).toLowerCase();

    if (decision === "sí" || decision === "si") {
        crecer(true);
    } else {
        crecer(false);
    }

    estado(dia);
}

console.log(`Simulación terminada. La planta creció a ${altura} cm en ${dias} días.`); 
