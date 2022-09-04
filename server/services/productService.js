const product = require("../model/product");

const createProduct = function (request, response) {
  const product = request.body;
  let newProduct = new product(product);
  newProduct.owner = request.user;
  save(newProduct)
    .then((newProduct) => {
      response.status(201).send(newProduct);
    })
    .catch((error) => {
      response
        .status(404)
        .json({ message: "Coudn't create the product", error: error });
    });
};

const getProducts = function (request, response) {
  product
    .find({})
    .populate("records")
    .then((products) => response.status(200).send(products))
    .catch((error) =>
      response.status(404).json({ messege: "products not found", error: error })
    );
};

const getProduct = function (request, response) {
  const productId = request.params.id;
  product
    .find({ _id: productId })
    .populate("records")
    .then((product) => response.status(200).send(product))
    .catch((error) =>
      response.status(404).json({ messege: "product not found", error: error })
    );
};

const updateProduct = function (request, response) {
  const productId = request.params.id;
  const productInfo = request.body;
  product
    .findByIdAndUpdate(productId, productInfo)
    .save()
    .then((updateProduct) => {
      response.status(200).send(updateProduct);
    })
    .catch((error) => {
      response
        .status(404)
        .json({ message: "cant update the product", error: error });
    });
};

const deleteProduct = function (request, response) {
  const productId = request.params.id;
  product
    .findByIdAndDelete(productId)
    .then((deletedProduct) => {
      response.send(deletedProduct);
    })
    .catch((error) => {
      response
        .status(404)
        .json({ messege: "cant delete the user", error: error });
    });
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
