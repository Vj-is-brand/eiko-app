import React from 'react';
const BulkOrderForm = ({isOpen, onClose, onSubmit}) => {
  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    onSubmit(formData);
  };

  return (
    <div className="popup-form">
      <div className="popup-inner">
        <form onSubmit={handleSubmit}>
          <h2>Submit Your Query</h2>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="4" cols="50" required></textarea>

          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default BulkOrderForm;