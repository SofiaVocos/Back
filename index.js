import {Contenedor} from "./desafio.js";

const producto = new Contenedor('productos')

producto.getAll()
    .then((data) => console.log({
        data
    }))
    .catch((error) => console.log({
        error
    }))

producto.save({
        title: 'Lapicera',
        price: '25',
        thumbnail: 'https://aldina.com.ar/wp-content/uploads/2020/08/bic-cristal-trazo-fino-azul-1.jpg',

    })
    .then((data) => console.log({
        data
    }))
    .catch((error) => console.log({
        error
    }))

producto.getById(10)
    .then((idProducto) => console.log({
        idProducto
    }))
    .catch((error) => console.log({
        error
    }))

// producto.deleteById(3)
//     .then(console.log(`eliminado con exito`))
//     .catch((error) => console.log({
//         error
//     }))

// producto.deleteAll()
// .then(console.log(`Archivo eliminado con exito`))
// .catch((error)=>console.log({error}))