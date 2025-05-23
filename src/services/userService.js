// services/userService.js

export const getUsers = async () => {
  const res = await fetch("http://localhost:3000/api/usuarios");

  if (!res.ok) {
    throw new Error("Error al obtener usuarios");
  }

  const data = await res.json();
  return data;
};

export const createUser = async (userData) => {
  const res = await fetch("http://localhost:3000/api/usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error("Error al crear usuario");
  }

  return await res.json();
};

export const updateUser = async (id, userData) => {
  const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error("Error al actualizar usuario");
  }

  return await res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error al eliminar usuario");
  }

  return await res.json();
};
