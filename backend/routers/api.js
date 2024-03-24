const router = require('express').Router();
const multer = require('multer');
const bodyParser = require('body-parser');
const regc = require('../controllers/regController');
const productController = require('../controllers/productController');
const categoryController = require('../controllers/categoryController');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 15 * 1024 * 1024, // 5 MB limit per file
  },
});

router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({ extended: true })); 
router.use(upload.array()); 

const isAuthenticated = (req, res, next) => {
  // Check if user is logged in
  if (!req.session || !req.session.user) {
      return res.status(401).json({
          status: 401,
          message: "Unauthorized: Please log in to access this resource"
      });
  }
  next();
};




router.post('/reg', regc.register);
router.post('/logincheck', regc.logincheck);
router.get('/products', productController.getAllProducts);
router.get('/product/:id', productController.getProductDetails);
router.post('/products', upload.single('image'), productController.addProduct);
router.put('/products/:id',upload.single('image'), productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
router.get('/categories', categoryController.getAllCategories);
router.post('/categories', categoryController.addCategory);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);
router.get('/user/profile', (req, res) => {
  const user = req.session.user;
  res.json({
      user: user
  });
});


module.exports = router;
