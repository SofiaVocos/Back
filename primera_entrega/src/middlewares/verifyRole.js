const IS_ADMIN = true;

const verifyRole = (req, res, next) => {
  if (!IS_ADMIN) return res.send({ error: "Usuario no autorizado" });

  next(); //Si es administrador, puede pasar a la ruta entonces va al "next"
};

export { verifyRole };
