import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../services/userService.js';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: null, name: '', email: '', password: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await getUsers();
    if (res.success) {
      setUsers(res.users);
    } else {
      alert(res.message);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async () => {
    const { id, name, email, password } = form;

    if (!name || !email || !password) return alert("Completa todos los campos");

    if (editingId) {
      const res = await updateUser(editingId, name, email, password);
      if (res.success) {
        await loadUsers();
        resetForm();
      } else {
        alert(res.message);
      }
    } else {
      const res = await createUser(name, email, password);
      if (res.success) {
        await loadUsers();
        resetForm();
      } else {
        alert(res.message);
      }
    }
  };

  const handleEdit = (user) => {
    setForm({ ...user });
    setEditingId(user.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este usuario?")) return;
    const res = await deleteUser(id);
    if (res.success) {
      await loadUsers();
    } else {
      alert(res.message);
    }
  };

  const resetForm = () => {
    setForm({ id: null, name: '', email: '', password: '' });
    setEditingId(null);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Gestión de Usuarios</h2>

      <div style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />
        <button onClick={handleAddOrUpdate} style={styles.addButton}>
          {editingId ? 'Actualizar' : 'Agregar'}
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Correo</th>
            <th>Nombre</th>
            <th>Contraseña</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.name}</td>
              <td>{u.password}</td>
              <td>
                <button onClick={() => handleEdit(u)} style={styles.actionBtn}>
                  Editar
                </button>
                <button onClick={() => handleDelete(u.id)} style={styles.deleteBtn}>
                  Borrar
                </button>
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
};

export default UserManagement;