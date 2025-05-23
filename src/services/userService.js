// userService.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const getUsers = async () => {
  const res = await fetch('http://localhost:3000/api/usuarios');
  if (!res.ok) throw new Error('Error al obtener usuarios');
  
  const data = await res.json();
  console.log('Datos recibidos:', data); // <-- Agrega esto

  return data;
};



export const createUser = async (user) => {
  const response = await fetch(`${API_URL}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error al crear usuario');
  return data;
};

export const updateUser = async (id, user) => {
  const response = await fetch(`${API_URL}/usuarios/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error al actualizar usuario');
  return data;
};

export const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}/usuarios/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error al eliminar usuario');
  return data;
};
