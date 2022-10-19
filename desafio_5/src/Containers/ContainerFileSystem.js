import fs from "fs";

// sin usar el type module en el package json usamos lo siguiente:
// const fs = require("fs");

class ContainerFilesystem {
  constructor(fileName) {
    this.filePath = `./src/db/${fileName}.json`;
  }

  async getAll() {
    try {
      const file = await fs.promises.readFile(this.filePath, "utf8");
      const elements = JSON.parse(file);

      return elements;
    } catch (error) {
      if (error.code === "ENOENT") {
        await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 3));
        return [];
      }
      console.log(error);
    }
  }

  async save(element) {
    try {
      const elements = await this.getAll();

      const id =
        elements.length === 0 ? 1 : elements[elements.length - 1].id + 1;

      // let id;
      // if(elements.length === 0){
      //     id = 1
      // } else {
      //     id = elements[elements.length - 1].id + 1;
      // }

      element.id = id;

      elements.push(element);

      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(elements, null, 3)
      );

      return element;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const elements = await this.getAll();

      const foundElement = elements.find((element) => element.id == id);

      if (!foundElement) return null;

      return foundElement;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const elements = await this.getAll();

      const foundElement = elements.find((element) => element.id == id);
      //   const foundElementIndex = elements.findIndex(
      //     (element) => element.id == id
      //   );

      if (!foundElement) return "Element not found";
      //if (foundElementIndex === -1) return "Element not found";

      const filterElements = elements.filter((element) => element.id != id);

      //   elements.splice(foundElementIndex, 1);

      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(filterElements, null, 3)
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 3));
    } catch (error) {
      console.log(error);
    }
  }

  async updateById(id, newData) {
    try {
      const elements = await this.getAll();

      const foundElementIndex = elements.findIndex(
        (element) => element.id == id
      );

      if (foundElementIndex === -1) return null;

      const foundElement = elements[foundElementIndex];

      // elements[foundElementIndex] = {
      //   ...foundElement,
      //   ...newData,
      // };

      // otra forma para actualizar dinamicamnete un objeto, recorremos todas las propiedades que llegan en newData usando un for in, y por cada key de newData, con el metodo hasOwnProperty de object, analizamos si foundElement tiene esa key que viene de newData, si la tiene, le asignamos el valor de newData
      // Ejemplo, si foundElement es un objeto { title: "producto", price: 1000 } y new data {title: "Producto Modificado", pepe: "no deberia guardar"},
      // recorremos newData, y si title existe en el foundelement, reemplazamos su valor, pero pepe no va a existir, por lo tanto pasa de largo el if.
      for (const key in newData) {
        if (foundElement.hasOwnProperty(key)) {
          foundElement[key] = newData[key];
        }
      }

      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(elements, null, 3)
      );

      return foundElement;
    } catch (error) {
      console.log(error);
    }
  }
}

export { ContainerFilesystem };

// sin usar el type module en el package json usamos lo siguiente:
// module.exports = ContainerFilesystem;