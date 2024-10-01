import React, { useEffect, useState } from 'react';


const Generic = () => {
  const [genericItems, setGenericItems] = useState([]);
  
  // New state variables for form inputs
  const [genericName, setGenericName] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Fetch Generic items
    const fetchGenericItems = async () => {
      const response = await fetch('https://66fc3278c3a184a84d166c16.mockapi.io/ToDo/Generic');
      const data = await response.json();
      setGenericItems(data);
    };

    fetchGenericItems();
  }, []);

  // Handle adding a new generic item
  const handleAddGeneric = async (e) => {
    e.preventDefault();
    
    const newGeneric = {
      GenericName: genericName,
      Status: status,
    };

    // Replace this URL with your actual API endpoint for adding a new generic item
    const addUrl = 'https://66fc3278c3a184a84d166c16.mockapi.io/ToDo/Generic';

    try {
      const response = await fetch(addUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGeneric),
      });

      if (response.ok) {
        const createdGeneric = await response.json();
        setGenericItems([...genericItems, createdGeneric]); // Add the new generic to the state
        setGenericName(''); // Clear input fields
        setStatus('');
      } else {
        throw new Error('Failed to add generic');
      }
    } catch (error) {
      console.error("Error adding generic:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Generic Page</h1>
      
      {/* Bootstrap Form for adding new generic items */}
      <form onSubmit={handleAddGeneric} className="mb-4">
        <div className="mb-3">
          <label htmlFor="genericName" className="form-label">Generic Name</label>
          <input
            type="text"
            className="form-control"
            id="genericName"
            placeholder="Enter Generic Name"
            value={genericName}
            onChange={(e) => setGenericName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <input
            type="text"
            className="form-control"
            id="status"
            placeholder="Enter Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Generic</button>
      </form>

      {/* Bootstrap Table for displaying generic items */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Generic Name</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {genericItems.map((item) => (
            <tr key={item.id}>
              <td>{item.GenericName}</td>
              <td>{item.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Generic;
