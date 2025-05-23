import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);

      // Extraer nombre del correo
      const extractedName = userData.email.split('@')[0];
      setName(extractedName);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h1 style={styles.welcomeText}>Bienvenido {name}</h1>
        <h2 style={styles.title}>Perfil de Usuario</h2>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Nombre:</label>
          <div style={styles.box}>{name}</div>
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Correo:</label>
          <div style={styles.box}>{user.email}</div>
        </div>

        <div style={styles.buttonGroup}>
          <button onClick={handleLogout} style={styles.logoutButton}>Cerrar sesión</button>
          <button onClick={() => navigate('/users')} style={styles.editButton}>Editar Usuarios</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    maxWidth: 400,
    margin: '50px auto',
    padding: 20,
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: 30,
  },
  welcomeText: {
    marginBottom: 20,
    color: '#333',
  },
  title: {
    color: '#000',
    marginBottom: 25,
  },
  fieldGroup: {
    marginBottom: 20,
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: 6,
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
  box: {
    border: '1px solid black',
    borderRadius: 4,
    padding: '10px 15px',
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 16,
    minHeight: 40,
    lineHeight: '40px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    marginTop: 30,
  },
  logoutButton: {
    padding: '10px 20px',
    fontSize: 16,
    borderRadius: 4,
    border: 'none',
    backgroundColor: '#dc3545',
    color: 'white',
    cursor: 'pointer',
  },
  editButton: {
    padding: '10px 20px',
    fontSize: 16,
    borderRadius: 4,
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
};

export default UserProfile;
