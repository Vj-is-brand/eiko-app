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

// for parsing application/json
router.use(bodyParser.json()); 

// for parsing application/xwww-
router.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
router.use(upload.array()); 
// router.use(express.static('public'));

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


module.exports = router;
