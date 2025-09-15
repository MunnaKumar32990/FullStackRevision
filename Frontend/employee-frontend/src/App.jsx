import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css"; 

import config from "./config";

const API_URL = `${config.url}/employees`;


function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", position: "" });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(API_URL);
      setEmployees(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching employees:", err);
      setEmployees([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (editing) {
      const response = await axios.put(`${API_URL}/${editing.id}`, form);
      console.log('Update response:', response);
      setEditing(null);
    } else {
      const response = await axios.post(API_URL, form);
      console.log('Create response:', response);
    }
    setForm({ name: "", email: "", position: "" });
    fetchEmployees();
  } catch (err) {
    console.error("Error saving employee:", err);
    console.error("API URL:", API_URL);
    console.error("Form data:", form);
  }
};


  const handleEdit = (employee) => {
    setForm(employee);
    setEditing(employee);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Employee Management System</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="input"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="input"
        />
        <input
          type="text"
          name="position"
          value={form.position}
          onChange={handleChange}
          placeholder="Position"
          required
          className="input"
        />
        <button type="submit" className="button">
          {editing ? "Update Employee" : "Add Employee"}
        </button>
      </form>

      <ul className="list">
        {Array.isArray(employees) && employees.map((emp) => (
          <li key={emp.id} className="list-item">
            <span>
              <strong>{emp.name}</strong> ({emp.email}) - {emp.position}
            </span>
            <div>
              <button onClick={() => handleEdit(emp)} className="edit-btn">
                Edit
              </button>
              <button onClick={() => handleDelete(emp.id)} className="delete-btn">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
