import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addCategory, removeItemFromCategory, updateItemFromCategory } from '../../actions/categoryAction';
import Header from "./partials/AdminHeader";
import Left from "./partials/Left";

function CategoryDash() {
    // State hooks for managing categories and form visibility
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [nameError, setNameError] = useState('');
    const [newCategory, setNewCategory] = useState({
        name: '',
    });
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isEditing, setIsEditing] = useState();
    const dispatch = useDispatch();
    const { categoryItems } = useSelector((state)=>state.category);

    const validateForm = () => {
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

        setNewCategory((prevCategory) => ({
            ...prevCategory,
            [name]: value,
        }));
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
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
            
        }
    };

    useEffect(() => {
        fetchCategories();
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

                            <div>
                                <button onClick={() => setShowForm(!showForm)} className="btn btn-success form-control my-3">
                                    {showForm ? 'Hide Form' : 'Add Category'}
                                </button>
                                {showForm && (
                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Add Category</h2>
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

                                                </div>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary mt-2 form-control"
                                                >
                                                    {isEditing ? 'Update Category' : 'Add Category'}
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>

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
