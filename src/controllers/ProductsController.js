import { products as productsArray } from "../mocks/products.js";
let products = productsArray;
export const ProductsController = {
  listProducts: (req, res) => {
    const { order } = req.query;
    const sortedUser = products.sort((a, b) => {
      if (order === "desc") {
        return a.id < b.id ? 1 : -1;
      }
      return a.id > b.id ? 1 : -1;
    });
    res.send(200, sortedUser);
  },
  getProductsById: (req, res) => {
    const { id } = req.params;

    const product = products.find((product) => product.id === Number(id));

    if (!product) {
      return res.send(400, { error: "Product not found" });
    }
    res.send(200, product);
  },

  createProduct: (req, res) => {
    const body = req.body;
    const lastProductId = products[products.length - 1].id;

    const newProduct = {
      ...body,
      id: lastProductId + 1,
    };

    products.push(newProduct);
    res.send(200, newProduct);
  },
  updateProduct: (req, res) => {
    let { id } = req.params;
    const { name } = req.body;
    id = Number(id);

    const productExists = products.find((product) => product.id === id);
    if (!productExists) {
      return res.send(400, { error: "Product Not Found" });
    }
    products = products.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          name,
        };
      }
      return product;
    });

    res.send(200, { id, name });
  },
  deleteProduct: (req, res) => {
    let { id } = req.params;
    id = Number(id);

    products = products.filter((product) => product.id !== id);

    res.send(200, products);
  },
};
