import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addCategory, removeItemFromCategory, updateItemFromCategory } from '../../actions/categoryAction';
import Header from "./partials/AdminHeader";
import Left from "./partials/Left";

function CategoryDash() {
<<<<<<< HEAD
=======
    // State hooks for managing categories and form visibility
    const [categories, setCategories] = useState([]);
>>>>>>> 7dc58301dba6451e391c03ca79b3497b85caf71b
    const [showForm, setShowForm] = useState(false);
    const [nameError, setNameError] = useState('');
    const [newCategory, setNewCategory] = useState({
        name: '',
    });
    const [selectedCategory, setSelectedCategory] = useState(null);
<<<<<<< HEAD
    const [isEditing, setIsEditing] = useState(false); // Initialize isEditing as false
=======
    const [isEditing, setIsEditing] = useState();
>>>>>>> 7dc58301dba6451e391c03ca79b3497b85caf71b
    const dispatch = useDispatch();
    const { categoryItems } = useSelector((state)=>state.category);

    const validateForm = () => {
<<<<<<< HEAD
        if (!newCategory.name.trim()) {
            setNameError('Please enter category name');
            return false;
        } else {
            setNameError('');
            return true;
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
=======
        let valid = true;
        if (!newCategory.name.trim()) {
            setNameError('Please enter your name');
            valid = false;
        } else {
            setNameError('');
        }
        return valid;
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;

>>>>>>> 7dc58301dba6451e391c03ca79b3497b85caf71b
        setNewCategory((prevCategory) => ({
            ...prevCategory,
            [name]: value,
        }));
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
<<<<<<< HEAD
    
        if (!validateForm()) {
            return;
        }
    
        if (isEditing && selectedCategory) {
            // If editing, dispatch an action to update the category
            dispatch(updateItemFromCategory(selectedCategory._id, newCategory));
        } else {
            // If not editing, dispatch an action to add the category
            dispatch(addCategory(newCategory));
        }
    
        // Reset form and selected category
        setNewCategory({ name: '' });
        setSelectedCategory(null);
        setIsEditing(false); // Reset isEditing after form submission
        setShowForm(false);
    };
    
    const handleEditClick = (categoryId) => {
        const categoryToUpdate = categoryItems.find(category => category._id === categoryId);
        if (categoryToUpdate) {
            setSelectedCategory(categoryToUpdate);
            setNewCategory({
                name: categoryToUpdate.name,
            });
            setIsEditing(true); // Set isEditing to true when editing
            setShowForm(true);
        } else {
            console.error(`Category with ID ${categoryId} not found.`);
        }
    };

    const handleDeleteClick = (categoryId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (confirmDelete) {
            dispatch(removeItemFromCategory(categoryId));
=======
        console.log('Adding/Editing category...');

        if (!validateForm()) {
            return;
        }
        // try {
        //     const url = selectedCategory ? `/api/categories/${selectedCategory._id}` : '/api/categories';
        //     const method = selectedCategory ? 'PUT' : 'POST';

        //     const response = await fetch(url, {
        //         method,
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(newCategory),
        //     });

        //     if (response.ok) {
        //         const updatedCategory = await response.json();

        //         if (selectedCategory) {
        //             // Replace the existing category with the updated details
        //             setCategories(categories.map(category =>
        //                 category._id === updatedCategory._id ? updatedCategory : category
        //             ));
        //         } else {
        //             // Add the new category to the list
        //             setCategories([...categories, updatedCategory]);
        //         }

        //         // Reset form and selected category
        //         setNewCategory({ name: '' });
        //         setSelectedCategory(null);

        //         setShowForm(false);
        //     } else {
        //         const errorMessage = await response.text();
        //         console.error('Error adding/editing category:', errorMessage);
        //     }
        // } catch (error) {
        //     console.error('Error adding/editing category', error);
        // }

        dispatch(addCategory(newCategory));

        // Reset form and selected category
        setNewCategory({ name: '' });
        setSelectedCategory(null);
        setShowForm(false);

    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories');
            if (response.ok) {
                const data = await response.json();
                // dispatch();
            } else {
                console.error('Error fetching categories');
            }
        } catch (error) {
            console.error('Error fetching categories', error);
        }
    };

    const handleEditClick = (categoryId) => {
        // setSelectedCategory(category);
        // setNewCategory({
        //     name: category.name,
        // });
        dispatch(updateItemFromCategory(categoryId,newCategory));
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDeleteClick = async (categoryId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (confirmDelete) {
            // try {
            //     const response = await fetch(`/api/categories/${categoryId}`, {
            //         method: 'DELETE',
            //     });

            //     if (response.ok) {
            //         setCategories(categories.filter(category => category._id !== categoryId));
            //     } else {
            //         const errorMessage = await response.text();
            //         console.error('Error deleting category:', errorMessage);
            //     }
            // } catch (error) {
            //     console.error('Error deleting category', error);
            // }
            dispatch(removeItemFromCategory(categoryId));
            
>>>>>>> 7dc58301dba6451e391c03ca79b3497b85caf71b
        }
    };

    useEffect(() => {
<<<<<<< HEAD
        // Fetch categories or any other initialization
=======
        fetchCategories();
>>>>>>> 7dc58301dba6451e391c03ca79b3497b85caf71b
    }, []);

    return (
        <>
            <Header />
            <section className="dash">
                <div className="container">
                    <div className="row">
                        <Left />
                        <div className="col-md-8">
                            <h1>Category Dashboard</h1>
<<<<<<< HEAD
=======

>>>>>>> 7dc58301dba6451e391c03ca79b3497b85caf71b
                            <div>
                                <button onClick={() => setShowForm(!showForm)} className="btn btn-success form-control my-3">
                                    {showForm ? 'Hide Form' : 'Add Category'}
                                </button>
                                {showForm && (
                                    <div className="card">
                                        <div className="card-header">
<<<<<<< HEAD
                                            <h2>{isEditing ? 'Edit Category' : 'Add Category'}</h2>
=======
                                            <h2>Add Category</h2>
>>>>>>> 7dc58301dba6451e391c03ca79b3497b85caf71b
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={handleAddCategory}>
                                                <div className="form-group">
                                                    <label>Name:</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={newCategory.name}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                    />
                                                    {nameError && <div className="text-danger">{nameError}</div>}
<<<<<<< HEAD
                                                </div>
                                                <button type="submit" className="btn btn-primary mt-2 form-control">
=======

                                                </div>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary mt-2 form-control"
                                                >
>>>>>>> 7dc58301dba6451e391c03ca79b3497b85caf71b
                                                    {isEditing ? 'Update Category' : 'Add Category'}
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
<<<<<<< HEAD
=======

>>>>>>> 7dc58301dba6451e391c03ca79b3497b85caf71b
                            {!showForm && (
                                <div>
                                    <h2>Category List</h2>
                                    <table className='table table-dark table-hover'>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categoryItems.length > 0 ? (
                                                categoryItems.map((category) => (
                                                    <tr key={category._id}>
                                                        <td>{category.name}</td>
                                                        <td>
                                                            <button className='btn btn-success me-2' onClick={() => handleEditClick(category._id)}>Edit</button>
                                                            <button className='btn btn-danger' onClick={() => handleDeleteClick(category._id)}>Delete</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="2">No categories found</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
<<<<<<< HEAD
=======



>>>>>>> 7dc58301dba6451e391c03ca79b3497b85caf71b
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default CategoryDash;
