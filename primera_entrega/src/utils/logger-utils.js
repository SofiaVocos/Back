import { ContainerFilesystem } from "../Containers/index.js";
import { DATE_UTILS } from "./date-utils.js";

const LoggerDao = new ContainerFilesystem("logs"); // Guarda TODOS los ERRORES

const addLog = async (error) => {
  const log = { timestamp: DATE_UTILS.getTimestamp(), message: error }; // Se crea un objeto del error con la fecha (timestamp)
  await LoggerDao.save(log);
};

export const LOGGER_UTILS = { addLog };
