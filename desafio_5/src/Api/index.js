import { ContainerMemory } from "../Containers/ContainerMemory.js";
import { ContainerFilesystem } from "../Containers/ContainerFilesystem.js";

// Aca podríamos importar todos nuestros "Containers base" y a partir de ellos, crear las instancias correspondientes. Luego las exportamos para que puedan ser usadas en otros archivos
// También nos sirve para seleccionar un tipo de instancia. Acá lo que hacemos es elegir entre Memoria y Archivo dependiendo de la variable PRODUCTS_FILENAME

const DB_TYPE = "filesystem";

const PRODUCTS_FILENAME = "productos";

const ProductApi =
  DB_TYPE === "filesystem"
    ? new ContainerFilesystem(PRODUCTS_FILENAME)
    : new ContainerMemory();

export { ProductApi };