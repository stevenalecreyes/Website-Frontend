const Product = require('../models/Product');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require("../auth");

module.exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    });

    const savedProduct = await newProduct.save();
    return res.status(200).send({ success: true, data: savedProduct });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

module.exports.getAllProducts = (req, res) => {

	return Product.find({}).then(result => {

		return res.send(result);
	})

}

module.exports.updateProduct = (req, res) => {
  const updatedProduct = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  };

  return Product.findByIdAndUpdate(req.params.productId, updatedProduct, { new: true })
    .then((product) => {
      if (!product) {
        return res.status(404).send({ success: false, message: 'Product not found' });
      }

      return res.send({ success: true, data: product });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).send({ success: false, message: 'Internal Server Error' });
    });
};


module.exports.archive = (req, res) => {
  let archivedProduct = {
    isActive: false
  }

  return Product.findByIdAndUpdate(req.params.productId, archivedProduct).then((course, error) => {

    if (error) {
      return res.send(false);
    } else {
      return res.send(true);
    }
  })

}

module.exports.activate = (req, res) => {
  let activateProduct = {
    isActive: true
  }

  return Product.findByIdAndUpdate(req.params.productId, activateProduct).then((course, error) => {

    if(error) {
      return res.send(false);
    } else {
      return res.send(true);
    }
  })
}