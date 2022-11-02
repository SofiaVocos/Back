import { Router } from "express";
import { CartDao, ProductDao } from "../../Dao/index.js";
import { DATE_UTILS, ERRORS_UTILS } from "../../utils/index.js";

const router = Router();

router.post("/", async (req, res) => { // Creo el carrito
  const baseCart = { timestamp: DATE_UTILS.getTimestamp(), products: [] };

  const cart = await CartDao.save(baseCart);

  res.send({ success: true, cartId: cart.id });
});


router.post("/:cartId/products", async (req, res) => { // Agrego un producto al carrito
  const { productId } = req.body;
  const { cartId } = req.params;

  const cart = await CartDao.getById(Number(cartId));

  if (!cart)
    return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART });

  const product = await ProductDao.getById(Number(productId));

  if (!product)
    return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT });

  // TODO
  cart.products.push(product); // Trae el Carrito

  const updatedCart = await CartDao.updateById(Number(cartId), cart); // Actualizar el Carrito (cart es para sobreescribir todas las Propiedades de Carrito)

  res.send({ success: true, cart: updatedCart });

});

router.get ("/:cartId/products", async (req, res) => {
  const { cartId } = req.params;

  const cart = await CartDao.getById(Number(cartId));
  if (!cart)
    return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART });

  res.send({ success: true,  products: cart.products});
});

router.delete("/:cartId", async (req, res) => {
    const {cartId} = req.params;
    const deleteCart = await CartDao.deleteById(Number(cartId));
    
    res.send({ success: true, cart: deleteCart });
});

router.delete("/:cartId/products/:productId", async (req, res) => {
  const {cartId, productId} = req.params;
  const cart = await CartDao.getById(Number(cartId));
  
  if (!cart) {
    return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART });
  } else {
    const productExists = await ProductDao.deleteById(Number(productId));
    res.send({ success: true, cart: productExists });
  }
});

export { router as CartRouter };
