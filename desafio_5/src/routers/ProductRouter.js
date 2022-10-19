import { Router } from "express";
// import { ContainerMemory } from "../Containers/ContainerMemory.js"; // Ya está importado en src/api/index.js
import { ProductApi } from "../Api/index.js";

const productRouter = Router(); // localhost:8080/api/productos


// const ProductMemory = new ContainerMemory(); // Creo la instancia 

// Hacemos que las rutas tengan su controlador async, ya que ahora ProductApi puede ser una instancia de clase Memoria o archivos (y archivos es async) (Entren a la carpeta src/api/index.js y van a ver que ahi se importan todos los Containers, y en base a alguna variable, es que creamos una instancia)



// Devuelve todos los productos.
productRouter.get("/", async (req, res) => {
    const products = await ProductApi.getAll();
//  const products = productMemory.getAll (); // Accedo al Método getAll de la Clase ContainerMemory
    res.send({ success: true, data: products }); // Si dijera res.json es para especificar claramente que adentro va a haber un json.
//                                                  Otra forma es poner "res.send(products)"
});



// Devuelve un producto según su id.
productRouter.get("/:id", async (req, res) => {
    const { id } = req.params; // Recibe un id por params.

    const product = await ProductApi.getById(Number(id)); // Si NO hubiese un === en getById y hubiese un ==, NO se pondría Number.

    if (!product) { // Si el Producto NO existe, que devuelva ese mensaje
        return res.send({
            success: false,
            data: undefined,
            message: "Product not found",
        });
    }

    res.send({ success: true, data: product }); // Sino que devuelva el producto.
});



// Recibe y agrega un producto y lo devuelve con su id asignado.
productRouter.post("/", async (req, res) => {
    const { title, price, thumbnail } = req.body; // Formato con el que va a agregar los productos.

    const product = await ProductApi.save({ title, price, thumbnail });
//  const product = ProductMemory.save ({ title, price, thumbnail })

    res.send({ success: true, data: { id: product.id } }); // En data mandamos un objeto que tiene una Propiedad id (id:) que tiene el id del Producto (product.id)
});



// Recibe y actualiza un producto según su id.
productRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, price, thumbnail } = req.body;

    const updatedProduct = await ProductApi.updateById(id, { // Se lo llama así porque es un Producto nuevo. Recibe 2 parámetros: el id y el objeto con la nueva data.
        title,
        price,
        thumbnail,
    });

    res.send({ success: true, data: { updated: updatedProduct } });
});


// Elimina un producto según su id.
productRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const product = await ProductApi.deleteById(Number(id));

    if (!product) { // Si el Producto NO existe, que devuelva ese mensaje
        return res.send({
            success: false,
            data: undefined,
            message: "Product delete",
        });
    }

    res.send({ success: true, data: { delete: product.id } }); // Sino que lo borre.
})



export { productRouter }; // Está devolviendo un Objeto.
// export default productRouter; // Puede hacerse de esta forma. Para importarlo en otro Archivo, se tiene que hacer "import productRouter from './routers/ProductRouter.js'; " 