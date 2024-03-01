import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from "./partials/AdminHeader";
import Left from "./partials/Left";

function ProductDash() {
    // State hooks for managing products, form visibility, selected product, and image preview
    const [products, setProducts] = useState([]);
    const productArray = Array.isArray(products) ? products : [];
    const [showForm, setShowForm] = useState(false);
    const [selectedProductIndex, setSelectedProductIndex] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [nameError, setNameError] = useState('');
    const [descError, setDescError] = useState('');
    const [ratingError, setRatingError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [offPriceError, setOffPriceError] = useState('');
    const [category, setCategory] = useState(''); // State for category
    const [subCategory, setSubCategory] = useState('');
    const [subCategories, setSubCategories] = useState([]); // State for subcategories

    // State hooks for new product and selected product details
    const [newProduct, setNewProduct] = useState({
        image: null,
        name: '',
        shortDescription: '',
        rating: '',
        price: '',
        offPrice: '',
        category: '',
        subCategory: '',
    });

    const [selectedProduct, setSelectedProduct] = useState({
        image: null,
        name: '',
        shortDescription: '',
        rating: '',
        price: '',
        offPrice: '',
        category: '',
        subCategory: '',
    });

    const [showFullDescriptions, setShowFullDescriptions] = useState({});

    const handleClick = (productId) => {
        setShowFullDescriptions((prev) => ({
            ...prev,
            [productId]: !prev[productId],
        }));
    };

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];

        if (file) {
            const previewUrl = file && (file instanceof Blob || file instanceof File) ? URL.createObjectURL(file) : null;

            if (field === 'image') {
                setNewProduct((prevProduct) => ({
                    ...prevProduct,
                    [field]: file,
                }));
                setImagePreviewUrl(previewUrl);
            }
        } else {
            console.error('No file selected');
            alert('Please select an image');
        }
    };

    const handleProductInputChange = (e) => {
        const { name, value } = e.target;

        if (showForm) {
            if (name === 'rating') {
                const isValidRating = /^\d*\.?\d{0,1}$/.test(value);
                if (isValidRating && parseFloat(value) >= 1 && parseFloat(value) <= 5) {
                    setRatingError('');
                    setNewProduct((prevProduct) => ({
                        ...prevProduct,
                        [name]: value,
                    }));
                } else {
                    setRatingError('Please enter a valid rating between 1 and 5');
                }
            } else {
                setNewProduct((prevProduct) => ({
                    ...prevProduct,
                    [name]: value,
                }));
            }
        } else {
            setSelectedProduct((prevProduct) => ({
                ...prevProduct,
                [name]: value,
            }));
        }

        if (name === 'category') {
            setCategory(value);
            // Fetch subcategories based on the selected category
            fetchSubCategories(value);
        }
    };
   
    const validateForm = () => {
        let valid = true;
        if (!newProduct.name.trim()) {
            setNameError('Please enter your name');
            valid = false;
        } else {
            setNameError('');
        }

        if (!newProduct.shortDescription.trim()) {
            setDescError('Please enter your desc');
            valid = false;
        } else {
            setDescError('');
        }

        if (!newProduct.rating.trim()) {
            setRatingError('Please enter your rating');
            valid = false;
        } else {
            setRatingError('');
        }

        if (!newProduct.price.trim()) {
            setPriceError('Please enter your price');
            valid = false;
        } else {
            setPriceError('');
        }

        if (!newProduct.offPrice.trim()) {
            setOffPriceError('Please enter your off price');
            valid = false;
        } else {
            setOffPriceError('');
        }

        if (!category.trim()) {
            alert('Please select a category');
            valid = false;
        }

        return valid;
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        console.log('Adding product...');

        if (!validateForm()) {
            return;
        }

        try {
            const formData = new FormData();
            formData.append('image', newProduct.image);
            formData.append('name', newProduct.name);
            formData.append('shortDescription', newProduct.shortDescription);
            formData.append('rating', newProduct.rating);
            formData.append('price', newProduct.price);
            formData.append('offPrice', newProduct.offPrice);
            formData.append('category', newProduct.category); // Append category to form data
            formData.append('subcategory', newProduct.subCategory)

            console.log('Form Data:', formData);


            const response = await fetch('/api/products', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const addedProduct = await response.json();
                setProducts([...products, addedProduct]);
                setShowForm(false);

                // Reset form
                setNewProduct({
                    image: null,
                    name: '',
                    shortDescription: '',
                    rating: '',
                    price: '',
                    offPrice: '',
                    category: '',
                    subCategory: '',
                });
            } else {
                const errorMessage = await response.text(); // Extract the error message
                console.error('Error adding product:', errorMessage);
            }
        } catch (error) {
            console.error('Error adding product', error);
        }
    };


    const handleEditProduct = (index) => {
        try {
            const productToEdit = products[index];

            if (!productToEdit || !productToEdit.image) {
                console.error('Invalid product or image');
                return;
            }

            setSelectedProduct(productToEdit);
            setSelectedProductIndex(index);

            if (typeof productToEdit.image === 'string') {
                setImagePreviewUrl(productToEdit.image);
            } else if (productToEdit.image instanceof Blob || productToEdit.image instanceof File) {
                const imageUrl = URL.createObjectURL(productToEdit.image);
                setImagePreviewUrl(imageUrl);
            } else {
                console.error('Invalid image type');
            }

            setNewProduct({
                image: null,
                ...productToEdit,
            });

            setShowForm(true);
        } catch (error) {
            console.error('Error editing product', error);
        }
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();

        try {
            if (!newProduct || !newProduct.image) {
                console.error('Selected product or image is null or undefined');
                return;
            }

            const formData = new FormData();
            formData.append('image', newProduct.image);
            formData.append('name', newProduct.name);
            formData.append('shortDescription', newProduct.shortDescription);
            formData.append('rating', newProduct.rating);
            formData.append('price', newProduct.price);
            formData.append('offPrice', newProduct.offPrice);
            formData.append('category', newProduct.category); // Append category to form data
            formData.append('subcategory', newProduct.subCategory)

            const response = await fetch(`/api/products/${selectedProduct._id}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                const updatedProduct = await response.json();
                console.log('Updated Product:', updatedProduct);
                const updatedProducts = [...products];
                updatedProducts[selectedProductIndex] = updatedProduct;
                setProducts(updatedProducts);
                setShowForm(false);
                setSelectedProduct({
                    image: updatedProduct.image,
                    _id: updatedProduct._id,
                    name: updatedProduct.name,
                    shortDescription: updatedProduct.shortDescription,
                    rating: updatedProduct.rating,
                    price: updatedProduct.price,
                    offPrice: updatedProduct.offPrice,
                    category: updatedProduct.category,
                    subCategory: updatedProduct.subCategory
                });
                // Reset form
                setNewProduct({
                    image: null,
                    name: '',
                    shortDescription: '',
                    rating: '',
                    price: '',
                    offPrice: '',
                    category: '',
                    subCategory: '',
                });
                setSelectedProductIndex(null);
            } else {
                console.error('Error updating product');
            }
        } catch (error) {
            console.error('Error updating product', error);
        }
    };

    useEffect(() => {
        return () => {
            if (imagePreviewUrl) {
                URL.revokeObjectURL(imagePreviewUrl);
            }
        };
    }, [imagePreviewUrl]);

    const handleDeleteProduct = async (index) => {
        try {
            const productId = products[index]._id;

            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const updatedProducts = [...products];
                updatedProducts.splice(index, 1);
                setProducts(updatedProducts);
            } else {
                console.error('Error deleting product');
            }
        } catch (error) {
            console.error('Error deleting product', error);
        }
    };

    const toggleFormVisibility = () => {
        setShowForm(!showForm);
        setSelectedProductIndex(null);
        setNewProduct({
            image: null,
            name: '',
            shortDescription: '',
            rating: '',
            price: '',
            offPrice: '',
            category: '',
            subCategory: '',
        });
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                console.error('Error fetching products');
            }
        } catch (error) {
            console.error('Error fetching products', error);
        }
    };
    const fetchSubCategories = async (selectedCategory) => {
        try {
            const response = await fetch(`/api/subcategories/${selectedCategory}`);
            if (response.ok) {
                const data = await response.json();
                // Update subCategories state here
                setSubCategories(data);
            } else {
                console.error('Error fetching subcategories');
            }
        } catch (error) {
            console.error('Error fetching subcategories', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        console.log('Component re-rendered. State:', newProduct);
    }, [newProduct]);

    return (
        <>
            <Header />
            <section className="dash">
                <div className="container">
                    <div className="row">
                        <Left />
                        <div className="col-md-8">
                            <h1>Product Dashboard</h1>

                            <div>
                                <button onClick={() => setShowForm(!showForm)} className="btn btn-success form-control my-3">
                                    {showForm ? 'Hide Form' : 'Add Product'}
                                </button>
                                {showForm && (
                                    <div className="card">
                                        <div className="card-header">
                                            <h2>{selectedProductIndex !== null ? 'Edit' : 'Add'} Product</h2>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={selectedProductIndex !== null ? handleUpdateProduct : handleAddProduct} encType='multipart/form-data'>
                                                <div className="form-group">
                                                    <label>Image:</label>
                                                    <input
                                                        type="file"
                                                        name="image"
                                                        accept="image/*"
                                                        onChange={(e) => handleFileChange(e, 'image')}
                                                        className="form-control"
                                                    />
                                                    {selectedProductIndex !== null ? (
                                                        imagePreviewUrl && <img src={imagePreviewUrl} alt="Update Product" width={'100px'} className="img-thumbnail mt-2" />
                                                    ) : (
                                                        imagePreviewUrl && <img src={imagePreviewUrl} alt="Add Product" width={'100px'} className="img-thumbnail mt-2" />
                                                    )}
                                                </div>
                                                <div className="form-group">
                                                    <label>Name:</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={showForm ? newProduct.name : selectedProduct.name}
                                                        onChange={handleProductInputChange}
                                                        className="form-control"
                                                        minLength="10" maxLength="50"
                                                    />
                                                    {nameError && <div className="text-danger">{nameError}</div>}
                                                </div>
                                                <div className="form-group">
                                                    <label>Short Description:</label>
                                                    <input
                                                        type="text"
                                                        name="shortDescription"
                                                        value={showForm ? newProduct.shortDescription : selectedProduct.shortDescription}
                                                        onChange={handleProductInputChange}
                                                        className="form-control"
                                                        minLength="20" maxLength="100"
                                                    />
                                                    {descError && <div className="text-danger">{descError}</div>}
                                                </div>
                                                <div className="form-group">
                                                    <label>Rating:</label>
                                                    <input
                                                        type="number"
                                                        name="rating"
                                                        value={showForm ? newProduct.rating : selectedProduct.rating}
                                                        onChange={handleProductInputChange}
                                                        className="form-control"
                                                        step="0.1"
                                                        min="1"
                                                        max="5"
                                                    />
                                                    {ratingError && <div className="text-danger">{ratingError}</div>}
                                                </div>
                                                <div className="form-group">
                                                    <label>Price:</label>
                                                    <input
                                                        type="number"
                                                        name="price"
                                                        value={showForm ? newProduct.price : selectedProduct.price}
                                                        onChange={handleProductInputChange}
                                                        className="form-control"
                                                    />
                                                    {priceError && <div className="text-danger">{priceError}</div>}
                                                </div>
                                                <div className="form-group">
                                                    <label>OffPrice:</label>
                                                    <input
                                                        type="number"
                                                        name="offPrice"
                                                        value={showForm ? newProduct.offPrice : selectedProduct.offPrice}
                                                        onChange={handleProductInputChange}
                                                        className="form-control"
                                                    />
                                                    {offPriceError && <div className="text-danger">{offPriceError}</div>}
                                                </div>
                                                <div className="form-group">
                                                    <label> Product Category:</label>
                                                    <select
                                                        name="category"
                                                        value={newProduct.category}
                                                        onChange={(e) => {
                                                            handleProductInputChange(e);
                                                            setSubCategory('');
                                                        }}
                                                        className="form-control"
                                                    >
                                                        <option value="">Select a Category....</option>
                                                        <option value="Desserts">Desserts</option>
                                                        <option value="Food">Food</option>
                                                        <option value="Beverages">Beverages</option>
                                                        <option value="Bakery">Bakery</option>
                                                        <option value="Cakes">Cakes</option>
                                                        <option value="Gifting">Gifting</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label>Sub Category:</label>
                                                    <select
                                                        name="subCategory"
                                                        value={newProduct.subCategory}
                                                        onChange={handleProductInputChange}
                                                        className="form-control"
                                                    >
                                                        <option value="">Select a Subcategory....</option>
                                                        <option value="Desserts">Desserts</option>
                                                        <option value="Food">Food</option>
                                                        <option value="Beverages">Beverages</option>
                                                        <option value="Bakery">Bakery</option>
                                                        <option value="Cakes">Cakes</option>
                                                        {subCategories.map((subcategory, index) => (
                                                            <option key={index} value={subcategory}>{subcategory}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="btn btn-primary mt-2 form-control"
                                                >
                                                    {selectedProductIndex !== null ? 'Update' : 'Add'} Product
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                )}

                            </div>

                            {!showForm && (
                                <div>
                                    <h2>Product List</h2>
                                    <table className="table table-dark table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Short Description</th>
                                                <th>Rating</th>
                                                <th>Price</th>
                                                <th>Off Price</th>
                                                <th>Product Category</th>
                                                <th>Sub Category</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productArray.length > 0 ? (
                                                productArray.map((product, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            {product.image && (
                                                                <img src={product.image} alt="Product" width={'50px'} className="img-thumbnail" />
                                                            )}
                                                        </td>
                                                        <td>{product.name}</td>
                                                        <td>
                                                            {showFullDescriptions[product._id] ? (
                                                                <>
                                                                    {product.shortDescription}{' '}
                                                                    <Link onClick={() => handleClick(product._id)}>Show less</Link>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {product.shortDescription.length > 50 ? (
                                                                        <span>
                                                                            {product.shortDescription.substring(0, 50)}{' '}
                                                                            <Link onClick={() => handleClick(product._id)}>
                                                                                Show more
                                                                            </Link>
                                                                        </span>
                                                                    ) : (
                                                                        product.shortDescription
                                                                    )}
                                                                </>
                                                            )}
                                                        </td>
                                                        <td>{product.rating}</td>
                                                        <td>{product.price}</td>
                                                        <td>{product.offPrice}</td>
                                                        <td>{product.category}</td>
                                                        <td>{product.subCategory}</td>
                                                        <td>
                                                            <button onClick={() => handleEditProduct(index)} className="btn btn-primary btn-sm mr-2">Edit</button>
                                                            <button onClick={() => handleDeleteProduct(index)} className="btn btn-danger btn-sm">Delete</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="7" className='text-center'>No records found</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ProductDash;
