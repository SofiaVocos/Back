import { ContainerFilesystem } from "../Containers/index.js"; // Se aprieta ctrl+espacio para ver lo que se quiere importar
import { config } from "../config/index.js";

const ProductDao = new ContainerFilesystem(       // Se crea la instancia para guardar los productos
  config.DATABASES.filesystem.PRODUCTS_FILENAME
);
const CartDao = new ContainerFilesystem(
  config.DATABASES.filesystem.CARTS_FILENAME
);

export { ProductDao, CartDao };
