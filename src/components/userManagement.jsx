import React, { useState } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (editingIndex !== null) {
      const updated = [...users];
      updated[editingIndex] = form;
      setUsers(updated);
      setEditingIndex(null);
    } else {
      setUsers([...users, form]);
    }
    setForm({ name: '', email: '', password: '' });
  };

  const handleEdit = (index) => {
    setForm(users[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const filtered = users.filter((_, i) => i !== index);
    setUsers(filtered);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Gestión de Usuarios</h2>

      <div style={styles.form}>
        <input type="text" name="name" placeholder="Nombre" value={form.name} onChange={handleChange} style={styles.input} />
        <input type="email" name="email" placeholder="Correo" value={form.email} onChange={handleChange} style={styles.input} />
        <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} style={styles.input} />
        <button onClick={handleAddOrUpdate} style={styles.addButton}>
          {editingIndex !== null ? 'Actualizar' : 'Agregar'}
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Contraseña</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.password}</td>
              <td>
                <button onClick={() => handleEdit(i)} style={styles.actionBtn}>Editar</button>
                <button onClick={() => handleDelete(i)} style={styles.deleteBtn}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 700,
    margin: '30px auto',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    display: 'flex',
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 8,
    fontSize: 16,
  },
  addButton: {
    padding: '8px 16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    fontSize: 16,
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  actionBtn: {
    marginRight: 5,
    backgroundColor: '#ffc107',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  deleteBtn: {
    backgroundColor: '#dc3545',
    border: 'none',
    padding: '5px 10px',
    color: 'white',
    cursor: 'pointer',
  },
  th: {
    backgroundColor: '#eee',
    padding: 10,
  },
  td: {
    padding: 10,
  },
};

export default UserManagement;