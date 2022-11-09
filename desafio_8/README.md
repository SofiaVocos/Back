El archivo .env no se debería subir, pero lo subo asi como está, así lo pueden correr tal cual

Primer paso:
Ejecutar el server de mysql.
Si no le hacen cambios, deberían crear una DB en mysql con el nombre: clase_16_32140, y los demas parametros los pueden ver ahí en el env y en src/config/index.js

Segundo paso:
npm install
npm run dev

Y deberían poder correr el proyecto.


No hay grandes modificaciones respecto al de la clase 12 de websockets, si no que se agrega un "container" más, y en src/services, unas funciones para manejar la creación de tablas de sql y las instancias de knex.
