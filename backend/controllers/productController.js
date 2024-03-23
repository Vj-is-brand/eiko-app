const Product = require('../models/products');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// get details of products
exports.getProductDetails = (async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
  
      if (!product) {
        return res.status(404).json({
          success: false,
          error: "Product not found",
        });
      }
  
      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      // Handle any errors that occur during the product retrieval process
      return res.status(500).json({
        success: false,
        error: "Internal Server Error",
      });
    }
  });
  

exports.addProduct = async (req, res) => {
    try {
        const { name, shortDescription, rating, price, offPrice, category, subcategory } = req.body; // Destructure subcategory from request body
        const image = req.file ? req.file.path : ''; 

        const newProduct = new Product({
            name,
            shortDescription,
            rating,
            price,
            offPrice,
            image,
            category,
            subcategory, // Add subcategory to the product object
        });

        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, shortDescription, rating, price, offPrice, category, subcategory } = req.body; // Destructure subcategory from request body

        let imagePath;
        if (req.file) {
            imagePath = req.file.path; 
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, shortDescription, rating, price, offPrice, ...(imagePath && { image: imagePath }), category, subcategory }, // Add subcategory to the update object
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
