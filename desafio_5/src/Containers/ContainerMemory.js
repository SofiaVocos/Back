class ContainerMemory {
  constructor() {
    this.elements = []; // Si lo ponemos acá, por cada instancia vamos a tener un Array distinto. "elements" es GENÉRICO, para que no solo sea de productos, se la va a usar para otras cosas..
  }

  getAll() { // Método para obtener todos los productos. Se lo usa en Product Router.
    return this.elements; 
  }


  save(element) { // No podría recibir ({title, price, thumbnail}) porque es GENÉRICO
    element.id =
      this.elements.length === 0 // Si No hay elementos, que agregue uno. Sino que busque el id del último elemento y que le agregue uno.
        ? 1 
        : this.elements[this.elements.length - 1].id + 1;

    this.elements.push(element); // Acá agrega el element al Array elements

    return element;
  }


  getById(id) { // Traer producto por id
    return this.elements.find((element) => element.id === id);
  }
  // {price: 299, nombre: "producto modifci"}


  updateById(id, newData) { // Actualizar producto.
    const elementIndex = this.elements.findIndex((element) => element.id == id); // El findIndex modifica el elemento en una posición del Array.

    if (elementIndex === -1) return null; // El findIndex devuelve un -1 si NO lo encuentra. Por lo tanto, si es -1, directamente retorna. No queremos seguir.

    const foundElement = this.elements[elementIndex];

    // Esta forma de "actualizar" un objeto, es util cuando previamente sepamos que la data contra la que comparamos (newData) tiene exactamente las mismas (o algunas) propiedades (y el tipo) que el original.
    // this.elements[elementIndex] = { // Acá se accede al Elemento
    //   ...this.elements[elementIndex], // Acá se copian todas las Propiedades que tengan newData y elementIndex. Estamos sobreescribiendo el Objeto que ya tiene por uno nuevo copiando todas las propiedades del Original más las nuevas.
    //   ...newData,
    // };

    // Otra forma para actualizar dinamicamnete un objeto, recorremos todas las propiedades que llegan en newData usando un for in, y por cada key de newData, con el metodo hasOwnProperty de object, analizamos si foundElement tiene esa key que viene de newData, si la tiene, le asignamos el valor de newData
    // Ejemplo, si foundElement es un objeto { title: "producto", price: 1000 } y new data {title: "Producto Modificado", pepe: "no deberia guardar"},
    // recorremos newData, y si title existe en el foundelement, reemplazamos su valor, pero pepe no va a existir, por lo tanto pasa de largo el if.
    for (const key in newData) {
      if (foundElement.hasOwnProperty(key)) {
        foundElement[key] = newData[key];
      }
    }

    return this.elements[elementIndex];
  }


  deleteById(id) { // Eliminar producto.
    this.elements.filter((element) => element.id != id); // Busca el que NO coincida con ese id.
    return { success: true };
  }
}

export { ContainerMemory };

// A partir de una Clase ya creada, se puede crear otra. Es decir, esta Clase se puede EXTENDER:
// class ProductMemory extends ContainerMemory --> ProductMemory Hereda todos los Métodos de ContainerMemory y las Propiedades.