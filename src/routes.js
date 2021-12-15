import { ProductsController } from "./controllers/ProductsController.js";
import { HomeController } from "./controllers/HomeController.js";
export const routes = [
  {
    endpoint: "/",
    method: "GET",
    handler: HomeController.welcome,
  },
  {
    endpoint: "/products",
    method: "GET",
    handler: ProductsController.listProducts,
  },
  {
    endpoint: "/products/:id",
    method: "GET",
    handler: ProductsController.getProductsById,
  },
  {
    endpoint: "/products",
    method: "POST",
    handler: ProductsController.createProduct,
  },
  {
    endpoint: "/products/:id",
    method: "PUT",
    handler: ProductsController.updateProduct,
  },
  {
    endpoint: "/products/:id",
    method: "DELETE",
    handler: ProductsController.deleteProduct,
  },
];
