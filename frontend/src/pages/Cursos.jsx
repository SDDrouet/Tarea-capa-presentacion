import { useState, useEffect } from "react";
import {
  getCursos,
  createCurso,
  deleteCurso,
  updateCurso,
} from "../services/api";

export default function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [creditos, setCreditos] = useState(0);
  const [editando, setEditando] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    fetchCursos();
  }, []);

  const fetchCursos = async () => {
    const { data } = await getCursos();
    setCursos(data.data);
  };

  const handleCreateOrUpdate = async () => {
    if (!nombre || !descripcion || creditos <= 0) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    if (editando) {
      await updateCurso(editando, { nombre, descripcion, creditos });
      setEditando(null);
    } else {
      await createCurso({ nombre, descripcion, creditos });
    }

    resetForm();
    fetchCursos();
  };

  const handleEdit = (curso) => {
    setNombre(curso.nombre);
    setDescripcion(curso.descripcion);
    setCreditos(curso.creditos);
    setEditando(curso.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este curso?")) {
      await deleteCurso(id);
      fetchCursos();
    }
  };

  const resetForm = () => {
    setNombre("");
    setDescripcion("");
    setCreditos(0);
    setEditando(null);
  };

  const cursosFiltrados = cursos.filter(
    (curso) =>
      curso.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      curso.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <h1 style={{ color: "#ffffff", textAlign: "center", marginBottom: "1rem" }}>
        Cursos
      </h1>
      <div style={{ marginBottom: "1rem", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Buscar cursos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            padding: "0.5rem",
            marginRight: "0.5rem",
            border: "1px solid #5758bb",
            borderRadius: "5px",
          }}
        />
      </div>
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{ marginRight: "0.5rem", padding: "0.5rem" }}
        />
        <input
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={{ marginRight: "0.5rem", padding: "0.5rem" }}
        />
        <input
          type="number"
          placeholder="Créditos"
          value={creditos}
          onChange={(e) => setCreditos(Number(e.target.value))}
          style={{ marginRight: "0.5rem", padding: "0.5rem" }}
        />
        <button
          onClick={handleCreateOrUpdate}
          style={{
            backgroundColor: "#6c63ff",
            color: "#ffffff",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {editando ? "Actualizar Curso" : "Crear Curso"}
        </button>
        {editando && (
          <button
            onClick={resetForm}
            style={{
              marginLeft: "0.5rem",
              backgroundColor: "#444",
              color: "#ffffff",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>
        )}
      </div>
      <table
        style={{
          width: "100%",
          marginTop: "1rem",
          borderCollapse: "collapse",
          color: "#ffffff",
        }}
      >
        <thead>
          <tr style={{ background: "#5758bb", color: "white" }}>
            <th style={{ padding: "0.5rem", textAlign: "center" }}>Nombre</th>
            <th style={{ padding: "0.5rem", textAlign: "center" }}>
              Descripción
            </th>
            <th style={{ padding: "0.5rem", textAlign: "center" }}>Créditos</th>
            <th style={{ padding: "0.5rem", textAlign: "center" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cursosFiltrados.map((curso) => (
            <tr key={curso.id}>
              <td style={{ padding: "0.5rem", borderBottom: "1px solid #ccc" }}>
                {curso.nombre}
              </td>
              <td style={{ padding: "0.5rem", borderBottom: "1px solid #ccc" }}>
                {curso.descripcion}
              </td>
              <td style={{ padding: "0.5rem", borderBottom: "1px solid #ccc" }}>
                {curso.creditos}
              </td>
              <td
                style={{
                  padding: "0.5rem",
                  borderBottom: "1px solid #ccc",
                  textAlign: "center",
                }}
              >
                <button
                  onClick={() => handleEdit(curso)}
                  style={{
                    marginRight: "0.5rem",
                    backgroundColor: "#6c63ff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "0.3rem 0.6rem",
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(curso.id)}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "0.3rem 0.6rem",
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
