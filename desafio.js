import fs from "fs";
class Contenedor {
  constructor(rutaArchivo) {
    this.rutaArchivo = `./${rutaArchivo}.txt`;
  }
  //**************************/
  async getAll() {
    //LEE EL ARCHIVO Y devuelve un ARRAY con los objetos existentes dentro
    try {
      const lectura = await fs.promises.readFile(this.rutaArchivo, "utf-8");
      const elements = JSON.parse(lectura); // lectura tiene archivo string
      return elements;
    } catch (err) {
      if (err.code === "ENOENT") {
        await fs.promises.writeFile(
          this.rutaArchivo,
          JSON.stringify([], null, 3)
        );
        return [];
      }
    }
  }
  //**************************/
  async save(obj) {
    // Lee el archivo, agrega el OBJ al ARRAY y reescribe con ID
    try {
      const array = await this.getAll();
      //si el array viene vacio no tiene id
      const id = array.length === 0 ? 1 : array[array.length - 1].id + 1;
      obj.id = id; // guardo ese id en la propiedad id del objeto pasado por parametro
      array.push(obj);
      await fs.promises.writeFile(
        this.rutaArchivo,
        JSON.stringify(array, null, 3)
      );
      return obj.id;
    } catch (err) {
      console.log("error de escritura", err);
    }
  }
  //**************************/
  async getById(id) {
    try {
      const array = await this.getAll();

      const idEncontrado = array.find((element) => element.id === id);

      if (!idEncontrado) return null;

      return idEncontrado;
    } catch (error) {
      console.log(error);
    }
  }
  //**************************/
  async deleteById(id) {
    try {
      const array = await this.getAll();

      const idEncontrado = array.find((element) => element.id == id);

      if (!idEncontrado) return "Elemento no encontrado";

      const arraySinId = array.filter((element) => element.id != id);

      await fs.promises.writeFile(
        this.rutaArchivo,
        JSON.stringify(arraySinId, null, 3)
      );
    } catch (error) {
      console.log(error);
    }
  }
  //********************** */
  async deleteAll() {
    try {
      await fs.promises.writeFile(
        this.rutaArchivo,
        JSON.stringify([], null, 3)
      );
    } catch (error) {
      console.log(error);
    }
  }
  //********************** */
}
//-----------------------------------------------------------------------------------------------------
export { Contenedor };
