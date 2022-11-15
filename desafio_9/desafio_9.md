# Comandos utilizados

- Para crear la base de datos

```console
use ecommerce;
```

- Para crear las colecciones

```console
db.createCollection('productos');
db.createCollection('mensajes');
```

- Para insertar los documentos a productos

```console
db.productos.insertMany([
  {
    "timestamp": ISODate(),
    "title": "Product 1",
    "price": 120,
    "description":"Description product 1",
    "code": "XP-1",
    "image": "someUrlProduct1.com",
    "stock": 100
  },
  {
    "timestamp": ISODate(),
    "title": "Product 2",
    "price": 580,
    "description":"Description product 2",
    "code": "XP-2",
    "image": "someUrlProduct2.com",
    "stock": 200
  },
  {
    "timestamp": ISODate(),
    "title": "Product 3",
    "price": 900,
    "description":"Description product 3",
    "code": "XP-3",
    "image": "someUrlProduct3.com",
    "stock": 300
  },
  {
    "timestamp": ISODate(),
    "title": "Product 4",
    "price": 1280,
    "description":"Description product 4",
    "code": "XP-4",
    "image": "someUrlProduct4.com",
    "stock": 400
  },
  { 
    "timestamp": ISODate(),
    "title": "Product 5",
    "price": 1700,
    "description":"Description product 5",
    "code": "XP-5",
    "image": "someUrlProduct5.com",
    "stock": 500
  },
  { 
    "timestamp": ISODate(),
    "title": "Product 6",
    "price": 2300,
    "description":"Description product 6",
    "code": "XP-6",
    "image": "someUrlProduct6.com",
    "stock": 600
  },
  { 
    "timestamp": ISODate(),
    "title": "Product 7",
    "price": 2860,
    "description":"Description product 7",
    "code": "XP-7",
    "image": "someUrlProduct7.com",
    "stock": 700
  },
  { 
    "timestamp": ISODate(),
    "title": "Product 8",
    "price": 3350,
    "description":"Description product 8",
    "code": "XP-8",
    "image": "someUrlProduct8.com",
    "stock": 800
  },
  {
    "timestamp": ISODate(),
    "title": "Product 9",
    "price": 4320,
    "description":"Description product 9",
    "code": "XP-9",
    "image": "someUrlProduct9.com",
    "stock": 900
  },
  { 
    "timestamp": ISODate(),
    "title": "Product 10",
    "price": 4990,
    "description":"Description product 10",
    "code": "XP-10",
    "image": "someUrlProduct10.com",
    "stock": 1000
  }
])
```

- Para insertar los documentos a mensajes

```console
db.mensajes.insertMany([
  {
    "email": "usuario1@gmail.com",
    "text": "Text 1",
    "timestamp": ISODate()
  },
  {
    "email": "usuario2@gmail.com",
    "text": "Text 2",
    "timestamp": ISODate()
  },
  {
   "email": "usuario3@gmail.com",
   "text": "Text 3",
   "timestamp": ISODate()
  },
  {
    "email": "usuario4@gmail.com",
    "text": "Text 4",
    "timestamp": ISODate()
  },
  {
    "email": "usuario5@gmail.com",
    "text": "Text 5",
    "timestamp": ISODate()
  },
  {
    "email": "usuario6@gmail.com",
    "text": "Text 6",
    "timestamp": ISODate()
  },
  {
    "email": "usuario7@gmail.com",
    "text": "Text 7",
    "timestamp": ISODate()
  },
  {
    "email": "usuario8@gmail.com",
    "text": "Text 8",
    "timestamp": ISODate()
  },
  {
    "email": "usuario9@gmail.com",
    "text": "Text 9",
    "timestamp": ISODate()
  },
  {
    "email": "usuario10@gmail.com",
    "text": "Text 10",
    "timestamp": ISODate()
  }
])
```

- Para listar todos los productos

```console
db.productos.find();
```

- Para listar todos los mensajes

```console
db.mensajes.find();
```

- Para contar la cantidad de documentos en productos

```console
db.productos.countDocuments();
```

- Para contar la cantidad de documentos en mensajes

```console
db.mensajes.countDocuments();
```

- Agregar otro producto más a *productos*

```console
db.productos.insertOne({
    "timestamp": ISODate(),
    "title": "Product 11",
    "price": 1595,
    "description":"Description product 11",
    "code": "XP-11",
    "image": "someUrlProduct11.com",
    "stock": 1100
});
```

- Devolver el **título** del producto que tiene código **XP-11**

```console
db.productos.find({code: "XP-11"}, {title: 1, _id:0});
```

- Listar productos con precio menor a 1000 pesos:

```console
db.productos.find({price: {$lt: 1000}});
```

- Listar los productos con precio entre los 1000 a 3000 pesos.

```console
db.productos.find({price: {$gt: 1000, $lt: 3000}});
```

- Listar los productos con precio mayor a 3000 pesos.

```console
db.productos.find({price: {$gt: 3000}});
```


- Realizar una consulta que traiga sólo el nombre del tercer producto más barato.

```console
db.productos.find({},{title:1, _id:0}).sort({price:1}).skip(2).limit(1);
```


- Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.

```console
db.productos.updateMany({}, {$inc: {stock: 100}});
```


- Cambiar el stock a cero de los productos con precios mayores a 4000 pesos. 

```console
db.productos.updateMany({price: {$gt: 4000}}, {$set: {stock: 0}});
```


- Borrar los productos con precio menor a 1000 pesos

```console
db.productos.deleteMany({price: {$lt: 1000}});
```


- Creación del usuario **pepe**, con contraseña: **asd456**. Permiso solo de lectura
  
```console
db.createUser({user: "pepe", pwd: "asd456", roles: [{role: "read", db: "ecommerce"}]});
```
