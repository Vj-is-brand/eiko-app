import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';


function Footer() {
    const [showModal, setShowModal] = useState(false);

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
    };

    return (
        <>
            <section id="footer">
                <div className="container">
                    <div className="row">
                        <div className='col-md-3 mb-5 m-md-0'>
                            <img src="./images/goldcroplogo.svg" alt="Footer Logo" className="img-fluid" style={{ maxWidth: '100px' }} />
                        </div>

                        <div className="col-md-6 mb-5 m-md-0">
                            <ul className="list-inline footer-menu m-0">
                                <div className="row">
                                    <div className="col-4">
                                        <li className="list-inline-item">
                                            <Link to="/">Home</Link>
                                        </li>
                                    </div>
                                    <div className="col-4">
                                        <li className="list-inline-item">
                                            <Link to="/">Contact</Link>
                                        </li>
                                    </div>
                                    <div className="col-4">
                                        <li className="list-inline-item">
                                            <Link to="/">Terms & Conditions</Link>
                                        </li>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <li className="list-inline-item">
                                            <Link to="/">Shop</Link>
                                        </li>
                                    </div>
                                    <div className="col-4">
                                        <li className="list-inline-item">
                                            <Link to="/">Our Locations</Link>
                                        </li>
                                    </div>
                                    <div className="col-4">
                                        <li className="list-inline-item">
                                            <Link to="/">Refund & Shipping</Link>
                                        </li>
                                    </div>
                                </div>
                            </ul>
                        </div>
                        <div className='col-md-3'>
                            <button onClick={handleButtonClick} className="btn btn-bulkorder btnlg">Party Order </button>
                        </div>
                        <Modal show={showModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Help us delight you by filling this</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {/* Add your form fields here */}
                                <form onSubmit={handleFormSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="fullName">Your Name:</label>
                                        <input type="text" id="fullName" name="fullName" className="form-control required" placeholder="Enter your name" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="contactNumber">Contact Number:</label>
                                        <input type="tel" id="contactNumber" name="contactNumber" className="form-control" placeholder="Enter your contact number" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="city">City:</label>
                                        <input type="text" id="city" name="city" className="form-control" placeholder="Enter your city" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="date">Date:</label>
                                        <input type="date" id="date" name="date" className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="noOfGuests">No. of Guests:</label>
                                        <input type="number" id="noOfGuests" name="noOfGuests" className="form-control" placeholder="Enter the number of guests" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email address:</label>
                                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter your email address" required />
                                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="occasion">What's the occasion?</label>
                                        <input type="text" id="occasion" name="occasion" className="form-control" placeholder="Enter the occasion" required />
                                    </div>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <button className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                                <button className="btn btn-primary">Submit</button>
                            </Modal.Footer>
                        </Modal>


                    </div>
                </div >
            </section >
            <p className='text-center m-0 p-2'>Copyright © 2024 EIKO. All Rights Reserved.</p>
        </>
    );
}

export default Footer;