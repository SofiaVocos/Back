import { config } from "../config/index.js";
import {
  ContainerMemory,
  ContainerFilesystem,
  SQLContainer,
} from "../Containers/index.js";
import { KnexService } from "../services/index.js";

const ALL_DATABASES = {
  filesystem: () => ({
    ProductDao: new ContainerFilesystem(
      config.DATABASES.filesystem.collections.PRODUCTS_FILENAME
    ),
    MessagesDao: new ContainerFilesystem(
      config.DATABASES.filesystem.collections.MESSAGES_FILENAME
    ),
  }),
  memory: () => ({
    ProductDao: new ContainerMemory(),
    MessagesDao: new ContainerMemory(),
  }),
  sql: () => {
 
    KnexService.init();
    return {
      ProductDao: new SQLContainer(KnexService.KnexMySQL, "productos"),
      MessagesDao: new SQLContainer(KnexService.KnexMySQL, "messages"),
    };
  },
};

export const { ProductDao, MessagesDao } =
  ALL_DATABASES[config.SELECTED_DATABASE.name]();
