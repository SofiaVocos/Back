const express = require ('express');

const app = express ();

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>
  console.log(`Server listening on PORT ${PORT}`)
);
server.on("error", (err) => console.log(`Error: ${err}`));

const routerApi = require ('./routes/productos.js')

app.use (express.json());
app.use (express.urlencoded ({extended: true}));
app.use ('/api/productos', routerApi);
app.use('/formulario', express.static ('public'));
