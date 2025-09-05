import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css"; // ✅ Import styles

const API_URL = "http://localhost:8080/api/employees";

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
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`${API_URL}/${editing.id}`, form);
        setEditing(null);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ name: "", email: "", position: "" });
      fetchEmployees();
    } catch (err) {
      console.error("Error saving employee:", err);
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
        {employees.map((emp) => (
          <li key={emp.id} className="list-item">
            <span>
              <strong>{emp.name}</strong> ({emp.email}) - {emp.position}
            </span>
            <div>
              <button onClick={() => handleEdit(emp)} className="edit-btn">
                Edit
              </button>
              <button
                onClick={() => handleDelete(emp.id)}
                className="delete-btn"
              >
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
