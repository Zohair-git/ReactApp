import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'; // For Bootstrap



const ToDo = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [genericItems, setGenericItems] = useState([]);

  const [todoName, setTodoName] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [genericName, setGenericName] = useState('');
  const [status, setStatus] = useState('');

  const [selectedTodo, setSelectedTodo] = useState(null); // State for selected ToDo for update
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const username = localStorage.getItem('username'); // Get the username from local storage

  useEffect(() => {
    // Fetch only the ToDo items for the logged-in user
    const fetchTodoItems = async () => {
      const response = await fetch(`https://669b443d276e45187d34fa30.mockapi.io/school/Todo?userName=${username}`);
      const data = await response.json();
      setTodoItems(data);
    };

    // Fetch the generic items
    const fetchGenericItems = async () => {
      const response = await fetch('https://66fc3278c3a184a84d166c16.mockapi.io/ToDo/Generic');
      const data = await response.json();
      setGenericItems(data);
    };

    fetchTodoItems();
    fetchGenericItems();
  }, [username]); // Only fetch items for the logged-in user

  // Handle adding a new ToDo task
  const handleAddTodo = async (e) => {
    e.preventDefault();

    const newTodo = {
      todoName,
      todoDescription,
      genericName,
      Status: status,
      userName: username, // Send the username with the API request
    };

    try {
      const response = await fetch('https://669b443d276e45187d34fa30.mockapi.io/school/Todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });

      if (response.ok) {
        const createdTodo = await response.json();
        setTodoItems([...todoItems, createdTodo]); // Add the new task to the list
        resetForm(); // Reset the form fields
      } else {
        throw new Error('Failed to add ToDo');
      }
    } catch (error) {
      console.error("Error adding ToDo:", error);
    }
  };

  // Handle updating ToDo status to "Completed"
  const handleComplete = async (id) => {
    try {
      const response = await fetch(`https://669b443d276e45187d34fa30.mockapi.io/school/Todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Status: 'Completed' }),
      });

      if (response.ok) {
        const updatedTodo = await response.json();
        setTodoItems(todoItems.map(item => item.id === id ? updatedTodo : item));
      }
    } catch (error) {
      console.error("Error completing ToDo:", error);
    }
  };

  // Handle deleting a ToDo task
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://669b443d276e45187d34fa30.mockapi.io/school/Todo/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTodoItems(todoItems.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error("Error deleting ToDo:", error);
    }
  };

  // Handle updating a ToDo task
  const handleUpdate = (todo) => {
    setSelectedTodo(todo); // Set the selected ToDo for editing
    setTodoName(todo.todoName);
    setTodoDescription(todo.todoDescription);
    setGenericName(todo.genericName);
    setStatus(todo.Status);
    setShowModal(true); // Show the update modal
  };

  // Handle closing the modal
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedTodo(null);
  };

  // Handle submitting the update form
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const updatedTodo = {
      ...selectedTodo,
      todoName,
      todoDescription,
      genericName,
      Status: status,
    };

    try {
      const response = await fetch(`https://669b443d276e45187d34fa30.mockapi.io/school/Todo/${selectedTodo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });

      if (response.ok) {
        const updatedItem = await response.json();
        setTodoItems(todoItems.map(item => item.id === updatedItem.id ? updatedItem : item));
        handleModalClose(); // Close the modal after updating
      }
    } catch (error) {
      console.error("Error updating ToDo:", error);
    }
  };

  // Reset the form fields
  const resetForm = () => {
    setTodoName('');
    setTodoDescription('');
    setGenericName('');
    setStatus('');
  };

  return (
    <div className="container mt-5">
      <h1>To Do Page</h1>

      {/* Form for adding new ToDo tasks */}
      <form onSubmit={handleAddTodo} className="mb-4">
        <div className="mb-3">
          <label htmlFor="todoName" className="form-label">ToDo Name</label>
          <input
            type="text"
            className="form-control"
            id="todoName"
            placeholder="Enter ToDo Name"
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="todoDescription" className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            id="todoDescription"
            placeholder="Enter Description"
            value={todoDescription}
            onChange={(e) => setTodoDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genericName" className="form-label">Generic Name</label>
          <select
            className="form-select"
            id="genericName"
            value={genericName}
            onChange={(e) => setGenericName(e.target.value)}
            required
          >
            <option value="">Select a Generic Name</option>
            {genericItems.map(item => (
              <option key={item.id} value={item.GenericName}>{item.GenericName}</option>
            ))}
          </select>
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
        <button type="submit" className="btn btn-primary">Add ToDo</button>
      </form>

      {/* Table for displaying ToDo tasks */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ToDo Name</th>
            <th scope="col">Description</th>
            <th scope="col">Generic Name</th>
            <th scope="col">Status</th>
            <th scope="col">User Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todoItems.map((item) => (
            <tr key={item.id}>
              <td>{item.todoName}</td>
              <td>{item.todoDescription}</td>
              <td>{item.genericName}</td>
              <td>{item.Status}</td>
              <td>{item.userName}</td>
              <td>
                <button className="btn btn-success me-2" onClick={() => handleComplete(item.id)}>Complete</button>
                <button className="btn btn-info me-2" onClick={() => handleUpdate(item)}>Update</button>
                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for updating ToDo */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update ToDo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateSubmit}>
            <div className="mb-3">
              <label htmlFor="modalTodoName" className="form-label">ToDo Name</label>
              <input
                type="text"
                className="form-control"
                id="modalTodoName"
                value={todoName}
                onChange={(e) => setTodoName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="modalTodoDescription" className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                id="modalTodoDescription"
                value={todoDescription}
                onChange={(e) => setTodoDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="modalGenericName" className="form-label">Generic Name</label>
              <select
                className="form-select"
                id="modalGenericName"
                value={genericName}
                onChange={(e) => setGenericName(e.target.value)}
                required
              >
                <option value="">Select a Generic Name</option>
                {genericItems.map(item => (
                  <option key={item.id} value={item.GenericName}>{item.GenericName}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="modalStatus" className="form-label">Status</label>
              <input
                type="text"
                className="form-control"
                id="modalStatus"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ToDo;
