import { useState, useEffect } from 'react';
import { getEstudiantes, createEstudiante, deleteEstudiante, updateEstudiante } from '../services/api';

export default function Estudiantes() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const fetchEstudiantes = async () => {
    const { data } = await getEstudiantes();
    setEstudiantes(data.data);
  };

  const handleCreateOrUpdate = async () => {
    if (!nombre || !apellido || !email || !fechaNacimiento || !telefono) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    const currentYear = new Date().getFullYear();
    const birthYear = new Date(fechaNacimiento).getFullYear();

    if (birthYear >= currentYear) {
      alert('La fecha de nacimiento debe ser un año anterior al actual.');
      return;
    }

    if (editando) {
      await updateEstudiante(editando, { nombre, apellido, email, fechaNacimiento, telefono });
      setEditando(null);
    } else {
      await createEstudiante({ nombre, apellido, email, fechaNacimiento, telefono });
    }

    resetForm();
    fetchEstudiantes();
  };

  const handleEdit = (estudiante) => {
    setNombre(estudiante.nombre);
    setApellido(estudiante.apellido);
    setEmail(estudiante.email);
    setFechaNacimiento(estudiante.fechaNacimiento);
    setTelefono(estudiante.telefono);
    setEditando(estudiante.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este estudiante?')) {
      await deleteEstudiante(id);
      fetchEstudiantes();
    }
  };

  const resetForm = () => {
    setNombre('');
    setApellido('');
    setEmail('');
    setFechaNacimiento('');
    setTelefono('');
    setEditando(null);
  };

  const estudiantesFiltrados = estudiantes.filter(
    (e) =>
      e.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <h1 style={{ color: '#ffffff', textAlign: 'center', marginBottom: '1rem' }}>Estudiantes</h1>
      <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Buscar estudiantes..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            padding: '0.5rem',
            marginRight: '0.5rem',
            border: '1px solid #5758bb',
            borderRadius: '5px',
          }}
        />
      </div>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{ marginRight: '0.5rem', padding: '0.5rem' }}
        />
        <input
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          style={{ marginRight: '0.5rem', padding: '0.5rem' }}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: '0.5rem', padding: '0.5rem' }}
        />
        <input
          type="date"
          placeholder="Fecha de Nacimiento"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          style={{ marginRight: '0.5rem', padding: '0.5rem' }}
        />
        <input
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          style={{ marginRight: '0.5rem', padding: '0.5rem' }}
        />
        <button
          onClick={handleCreateOrUpdate}
          style={{
            backgroundColor: '#6c63ff',
            color: '#ffffff',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {editando ? 'Actualizar Estudiante' : 'Crear Estudiante'}
        </button>
        {editando && (
          <button
            onClick={resetForm}
            style={{
              marginLeft: '0.5rem',
              backgroundColor: '#ff6f61',
              color: '#ffffff',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Cancelar
          </button>
        )}
      </div>
      <table
        style={{
          width: '100%',
          marginTop: '1rem',
          borderCollapse: 'collapse',
          color: '#ffffff',
        }}
      >
        <thead>
          <tr style={{ background: '#5758bb', color: 'white' }}>
            <th style={{ padding: '0.5rem', textAlign: 'center' }}>Nombre</th>
            <th style={{ padding: '0.5rem', textAlign: 'center' }}>Apellido</th>
            <th style={{ padding: '0.5rem', textAlign: 'center' }}>Email</th>
            <th style={{ padding: '0.5rem', textAlign: 'center' }}>Fecha de Nacimiento</th>
            <th style={{ padding: '0.5rem', textAlign: 'center' }}>Teléfono</th>
            <th style={{ padding: '0.5rem', textAlign: 'center' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantesFiltrados.map((e) => (
            <tr key={e.id}>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #ccc' }}>{e.nombre}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #ccc' }}>{e.apellido}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #ccc' }}>{e.email}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #ccc' }}>{e.fechaNacimiento}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #ccc' }}>{e.telefono}</td>
              <td
                style={{
                  padding: '0.5rem',
                  borderBottom: '1px solid #ccc',
                  textAlign: 'center',
                }}
              >
                <button
                  onClick={() => handleEdit(e)}
                  style={{
                    marginRight: '0.5rem',
                    backgroundColor: '#6c63ff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '0.3rem 0.6rem',
                    cursor: 'pointer',
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(e.id)}
                  style={{
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '0.3rem 0.6rem',
                    cursor: 'pointer',
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
