const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Guardar el token en localStorage
const setToken = (token) => localStorage.setItem("token", token);

// Obtener el token del localStorage
const getToken = () => localStorage.getItem("token");

// Eliminar el token del localStorage
const removeToken = () => localStorage.removeItem("token");

// Verificar si el usuario está autenticado
const isAuthenticated = () => !!getToken();

// Login
const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      setToken(data.token);
      return { success: true };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    return { success: false, message: "Error en la conexión con el servidor" };
  }
};

export {
  setToken,
  getToken,
  removeToken,
  isAuthenticated,
  login
};
