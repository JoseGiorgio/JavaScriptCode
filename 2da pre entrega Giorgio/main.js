// Clases para los personajes
class Personaje {
    constructor(nombre, vida, ataque, defensa, energia) {
        this.nombre = nombre;
        this.vida = vida;
        this.ataque = ataque;
        this.defensa = defensa;
        this.energia = energia; // Nueva propiedad: energía
    }

    // Funcion de ataque básico
    atacar(oponente) {
        let dano = this.ataque - oponente.defensa;
        if (dano > 0) {
            oponente.vida -= dano;
            console.log(`${this.nombre} ataca a ${oponente.nombre} y causa ${dano} puntos de daño!`);
        } else {
            console.log(`${this.nombre} ataca a ${oponente.nombre} pero no logra causar daño!`);
        }
    }

    // Funcion de ataque especial 
    hechizoEspecial(oponente) {
        if (this.energia >= 20) {
            let danoMagico = this.ataque * 1.5;
            oponente.vida -= danoMagico;
            this.energia -= 20; // El hechizo consume 20 puntos de energía
            console.log(`${this.nombre} lanza un hechizo especial y causa ${danoMagico} puntos de daño!`);
        } else {
            console.log(`${this.nombre} no tiene suficiente energía para lanzar un hechizo especial!`);
        }
    }

    // Funcion para defenderse (reduce el daño en el próximo turno)
    defender() {
        this.defensa += 5;
        console.log(`${this.nombre} se defiende y aumenta su defensa temporalmente!`);
    }

    // Funcion para mostrar el estado del personaje
    mostrarEstado() {
        console.log(`${this.nombre}: Vida = ${this.vida}, Energía = ${this.energia}`);
    }
}

// Instanciamos los personajes (Guerrero y Mago)
let guerrero = new Personaje("Guerrero", 100, 20, 10, 50);
let mago = new Personaje("Mago", 80, 25, 5, 60);

// Función para seleccionar un personaje
function seleccionarPersonaje() {
    let seleccion = prompt("Elige tu personaje: (1) Guerrero (2) Mago");
    if (seleccion === "1") {
        return guerrero;
    } else if (seleccion === "2") {
        return mago;
    } else {
        console.log("Selección inválida. Jugando como Guerrero por defecto.");
        return guerrero;
    }
}

// Función para elegir el ataque del personaje
function elegirAtaque(jugador, oponente) {
    let accion = prompt(`Elige una acción para ${jugador.nombre}: (1) Atacar (2) Hechizo especial (3) Defender`);
    if (accion === "1") {
        jugador.atacar(oponente);
    } else if (accion === "2") {
        jugador.hechizoEspecial(oponente);
    } else if (accion === "3") {
        jugador.defender();
    } else {
        console.log("Acción inválida.");
    }
}

// Función para el combate
function iniciarCombate() {
    
    let jugador = seleccionarPersonaje();
    let oponente = jugador === guerrero ? mago : guerrero; 
    
    while (jugador.vida > 0 && oponente.vida > 0) {
        
        elegirAtaque(jugador, oponente);
        jugador.mostrarEstado();
        oponente.mostrarEstado();

        // Verificar si el oponente sigue vivo
        if (oponente.vida <= 0) {
            console.log(`${oponente.nombre} ha sido derrotado! ${jugador.nombre} gana!`);
            break;
        }

        // Turno del oponente (automático)
        if (oponente.vida > 0) {
            let accionOponente = Math.random() > 0.5 ? "atacar" : "hechizoEspecial";
            if (accionOponente === "atacar") {
                oponente.atacar(jugador);
            } else {
                oponente.hechizoEspecial(jugador);
            }

            // Mostrar estado después del turno del oponente
            jugador.mostrarEstado();
            oponente.mostrarEstado();

            // Verificar si el jugador sigue vivo
            if (jugador.vida <= 0) {
                console.log(`${jugador.nombre} ha sido derrotado! ${oponente.nombre} gana!`);
                break;
            }
        }
    }
}

// Iniciar el combate
iniciarCombate();
