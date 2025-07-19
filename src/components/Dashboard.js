import React, { useEffect, useState } from 'react';
import './Dashboard.css';

export default function Dashboard() {
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Fetch clients and employees from API
 /* useEffect(() => {
    //fetch('http://localhost:3001/clients')
    fetch("https://securelytix-api.onrender.com/clients")
      .then(res => res.json())
      .then(data => setClients(data))
      .catch(err => console.error('Failed to load clients:', err));

    //fetch('http://localhost:3001/employees')
    fetch("https://securelytix-api.onrender.com/employees")
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error('Failed to load employees:', err));
  }, []);
*/
  useEffect(() => {
  fetch("https://securelytix-api.onrender.com/clients")
    .then(res => res.json())
    .then(data => {
      console.log("Clients:", data);
      setClients(data);
    })
    .catch(err => console.error('Failed to load clients:', err));

  fetch("https://securelytix-api.onrender.com/employees")
    .then(res => res.json())
    .then(data => {
      console.log("Employees:", data);
      setEmployees(data);
    })
    .catch(err => console.error('Failed to load employees:', err));
}, []);

  const handleClientChange = (e) => {
    const id = parseInt(e.target.value);
    const client = clients.find(c => c.id === id);
    setSelectedClient(client);
  };

  const handleEmployeeChange = (e) => {
    const id = parseInt(e.target.value);
    const employee = employees.find(emp => emp.id === id);
    setSelectedEmployee(employee);
  };

  return (
  <div className="dashboard-container">
    <h2>Welcome to Securelytix Dashboard</h2>

    <div className="section">
      <label>Select Client:</label>
      <select onChange={handleClientChange} defaultValue="">
        <option value="">-- Select Client --</option>
        {clients.map(client => (
          <option key={client.id} value={client.id}>{client.name}</option>
        ))}
      </select>

      {selectedClient && (
        <div className="details-box">
          <p><strong>Name:</strong> {selectedClient.name}</p>
          <p><strong>Role:</strong> {selectedClient.role}</p>
          <p><strong>Contact:</strong> {selectedClient.contact}</p>
        </div>
      )}
    </div>

    <div className="section">
      <label>Select Employee:</label>
      <select onChange={handleEmployeeChange} defaultValue="">
        <option value="">-- Select Employee --</option>
        {employees.map(emp => (
          <option key={emp.id} value={emp.id}>{emp.name}</option>
        ))}
      </select>

      {selectedEmployee && (
        <div className="details-box">
          <p><strong>Name:</strong> {selectedEmployee.name}</p>
          <p><strong>Role:</strong> {selectedEmployee.role}</p>
          <p><strong>Contact:</strong> {selectedEmployee.contact}</p>
        </div>
      )}
    </div>
  </div>
  );
}
