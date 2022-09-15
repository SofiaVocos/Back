class Usuario {
    constructor(nombre, apellido, libros = [], mascotas = []) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota) {
        this.mascotas.push(mascota);
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(titulo, autora) {
        this.libros.push({ titulo, autora });
    }

    getBookNames() {
        return this.libros.map((libro) => libro.titulo);
    }
}

const usuario1 = new Usuario(
    "Sofía",
    "Vocos",
    [{ titulo: "23 razones", autora: "Cin Wololo" }],
    ["gato", "perro"]
);

console.log(usuario1.getFullName());

console.log({ cantidad: usuario1.countMascotas() });
usuario1.addMascota("loro");

console.log({ cantidad: usuario1.countMascotas() });

usuario1.addBook("Caos", "Magali Tajes");

const booksName = usuario1.getBookNames();
console.log(booksName);

const usuario2 = new Usuario(
    "Belén",
    "Cisneros",
    [{ titulo: "Después del Minuto 8", autora: "Sol Iannaci" }],
    ["tortuga", "conejo"]
);

console.log(usuario2.getBookNames());
