const express = require('express');
const app = express();
const productRoutes = express.Router();

let Product = require('../models/Product');


/**
 * Route to create new product
 */
productRoutes.route('/add').post(function(req, res){
    let product = new Product(req.body);
    product.save().then(product => {
        res.status(200).json({'Product': 'Product has been added successfully.'});
    }).catch(err => {
        res.status(400).send("Unable to save to database.")
    });
});

/**
 * Route to get products
 */
productRoutes.route('/').get(function(req, res) {
    Product.find(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

/**
 * Route to edit a product
 */
productRoutes.route('/edit/:id').get(function(req, res) {
    let id = req.params.id;
    Product.findById(id, function(err, product) {
        res.json(product);
    });
});

/**
 * Route to update a product
 */
productRoutes.route('/update/:id').post(function(req, res) {
    Product.findById(req.params.id, function(err, product) {
        if (!product) {
            res.status(404).send("Record not found");
        } else {
            product.ProductName = req.body.ProductName;
            product.ProductDescription = req.body.ProductDescription;
            product.ProductPrice = req.body.ProductPrice;
            product.save().then(product => {
                res.json('Update complete.');
            }).catch(err => {
                res.status(400).send('Unable to update the database.');
            });
        }
    });
});

/**
 * Route to delete a product
 */
productRoutes.route('/delete/:id').get(function(req, res) {
    Product.findByIdAndRemove({_id: req.params.id}, function(err, product) {
        if (err)
            res.json(err);
        else
            res.json('Successfully removed.');
    });
});

module.exports = productRoutes;