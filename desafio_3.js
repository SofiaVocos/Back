const fs= require ('fs')

const express= require ('express')
const app= express()
// const PORT=process.env.PORT || 8080;

class Contenedor {
    constructor(rutaArchivo) {
        this.rutaArchivo = `./${rutaArchivo}.txt`;
    }
    //**************************/
    async getAll() { //LEE EL ARCHIVO Y devuelve un ARRAY PARSEADO con los objetos existentes dentro
        try {
            const lectura = await fs.promises.readFile(this.rutaArchivo, 'utf-8')
            const elements=JSON.parse(lectura) // lectura tiene archivo string. Entonces lo parseo
            return elements
        } catch (err) {
            if(err.code==='ENOENT'){
                await fs.promises.writeFile(this.rutaArchivo,JSON.stringify([],null,3))
                return []
            }

            throw new Error(`${error.message}`);
        }
    }
    //**************************/
    async save(obj) { // Lee el archivo, agrega el OBJ al ARRAY y reescribe con ID 
        try {
            const array=await this.getAll()
            //si el array viene vacio no tiene id
            const id = array.length === 0 ? 1 : array[array.length-1].id + 1
            obj.id=id // guardo ese id en la propiedad id del objeto pasado por parametro
            array.push(obj) 
            await fs.promises.writeFile(this.rutaArchivo,JSON.stringify(array,null,3))
            return obj.id
        } catch (err) {
            throw new Error(`El archivo no pudo manipularse, error: ${error.message}`);
        }
    }
    //**************************/
    async getById(number) {
        try {
          const array = await this.getAll();

          const idrandom = parseInt(Math.random()*array.length)+1;
    
          const idEncontrado = array.find((element) => element.id === idrandom);
    
          if (!idEncontrado) return null;
    
          return idEncontrado;
        } catch (error) {
            throw new Error(`Error: no se encontro el producto`);
        }
      }
      //**************************/
      async deleteById() {
        try {
          const array = await this.getAll();

          const idrandom = parseInt(Math.random()*array.length)+1;
    
          const idEncontrado = array.find((element) => element.id === idrandom);
    
          if (!idEncontrado) return 'Error: No pudo encontrarse el producto';

          const elementosFiltrados = array.filter((element) => element.id != number)
          
          await fs.promises.writeFile(this.rutaArchivo,JSON.stringify(elementosFiltrados,null,3))
          
          return elementosFiltrados

        } catch (error) {
            throw new Error(`El archivo no pudo manipularse, error: ${error.message}`);
        }
      }
}

// const productosArchivo = new Contenedor('productos')

// productosArchivo.save({
//         title: 'Lapicera',
//         price: '25',
//         thumbnail: 'https://aldina.com.ar/wp-content/uploads/2020/08/bic-cristal-trazo-fino-azul-1.jpg',

//     })
//     .then((data) => console.log({
//         data
//     }))
//     .catch((error) => console.log({
//         error
//     }))

// app.get('/producto',(peticion,res)=>{
//     productosArchivo.getAll()
//     .then(lista=>{res.json(lista)})
// })

// app.get('/productoRandom',(peticion,res)=>{
//     productosArchivo.getById()
//     .then(lista=>{res.json(lista)})
//     .catch((error) => console.log({
//         error
//     }))
// })

// const server= app.listen(PORT,()=>{
//     console.log(`server escuchado en el puerto ${server.address().port}`)
// })
// server.on('error', error=> console.log(`error de servidor ${error}`))

module.exports = Contenedor;