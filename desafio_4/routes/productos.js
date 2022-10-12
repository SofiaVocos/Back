const express = require ('express');
const {Router} = express;
const routerApi = Router ();
const fs = require ('fs');
const filePath = 'productos.json';

async function getAll() {
    try {
      const contenido = await fs.readFile(filePath, "utf-8");
      const elementos = JSON.parse(contenido);
      return elementos;
    } catch (error) {
      if (error.code === "ENOENT") {
        await fs.writeFile(filePath, JSON.stringify([], null, 3));
  
        return [];
      }
      throw new Error(`${error.message}`);
    }
  }
  
  async function save(object) {
    try {
      const elementos = await getAll();
      const id =
        elementos.length === 0 ? 1 : elementos[elementos.length - 1].id + 1;
      object.id = id;
      elementos.push(object);
      await fs.writeFile(filePath, JSON.stringify(elementos, null, 2));
      return object.id;
    } catch (error) {
      throw new Error(`El archivo no pudo manipularse, error: ${error.message}`);
    }
  }
  async function getById(number) {
    try {
      const elementos = await getAll();
      let elemento = elementos.find((element) => element.id == number);
      if (!elemento) {
        return null;
      }
      return { elemento };
    } catch (error) {
      throw new Error(`Error: no se encontro el producto`);
    }
  }
  async function deleteById(number){
      try {
          const elementos = await getAll()
          let elemento = elementos.find((element) => element.id == number)
          if (!elemento) return 'Error: No pudo encontrarse el producto'
          const elementosFiltrados = elementos.filter((element) => element.id != number)
          await fs.writeFile(filePath, JSON.stringify(elementosFiltrados,null,3))
          return elementosFiltrados
      }
      catch(error){
          throw new Error (`El archivo no pudo manipularse, error: ${error.message}`)
      }
  }

let productos = [];

routerApi.get("/", (req, res) => {
  getAll()
    .then((data) => res.send({ data }))
    .catch((error) => console.log({ error }));
});

routerApi.get("/:id", (req, res) => {
  const id = req.params.id;
  getById(id)
    .then((data) => {
        if(data === null){
            res.send('Error: No pudo encontrarse el producto')
        }else{
            res.send(data);
        }
    })
    .catch((error) => res.send(error));
});

routerApi.post("/", (req, res) => {
    save(producto)
    .then(productos.push(producto))
    .then(res.status(200).send("Producto agregado"));

  const producto = req.body;
  const id = productos.length === 0 ? 1 : productos[productos.length - 1].id + 1;
  producto.id = id;
  productos.push(producto);
  res.status(200).send('Producto agregado');
});


// router.post('/', async (req, res) => {
//     const element = req.body;
//     const id = productos.length === 0 ? 1 : productos[productos.length - 1].id + 1;
//     element.id = id;
//     productos.push(element);

//     res.status(200).send('Producto agregado');
// })

routerApi.put("/:id", (req, res) => {
    const id = req.params.id;
    getById(id)
      .then((data) => {
        if(data === null){
            res.send('Error: No pudo encontrarse el producto')
        }else{
            res.send(req.body);
        }
      })
      .catch((error) => console.log({ error }));
});

routerApi.delete("/:id", (req,res) => {
    const id = req.params.id;
    deleteById(id)
      .then((data) => {
        if(data === null){
            res.send('Error: No pudo encontrarse el producto')
        }else{
            res.send(data);
        }
      })
      .catch((error) => console.log({ error }));
})

module.exports = routerApi;