package com.espe.micro_cursos.services;

import com.espe.micro_cursos.clients.EstudianteClient;
import com.espe.micro_cursos.model.entity.Curso;
import com.espe.micro_cursos.model.entity.CursoEstudiante;
import com.espe.micro_cursos.model.entity.Estudiante;
import com.espe.micro_cursos.repositories.CursoRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CursoServiceImpl implements CursoService {

    @Autowired
    private CursoRepository cursoRepository;

    @Autowired
    private EstudianteClient estudianteClient;

    @Autowired
    ObjectMapper objectMapper;

    @Override
    public List<Curso> listarTodos() {
        return cursoRepository.findAll();
    }

    @Override
    public Curso guardarCurso(Curso curso) {
        return cursoRepository.save(curso);
    }

    @Override
    public Curso obtenerPorId(Long id) {
        return cursoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado con ID: " + id));
    }

    @Override
    public void eliminarPorId(Long id) {
        if (!cursoRepository.existsById(id)) {
            throw new RuntimeException("Curso no encontrado con ID: " + id);
        }
        cursoRepository.deleteById(id);
    }

    @Override
    public Optional<Estudiante> addEstudiante(Estudiante estudiante, Long id) {
        Optional<Curso> optionalCurso = cursoRepository.findById(id);
        if (optionalCurso.isPresent()) {
            // Obtener el estudiante del servicio externo
            ResponseEntity<Map<String, Object>> response = estudianteClient.obtenerEstudiante(estudiante.getId());

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                // Convertir la respuesta del cuerpo a Estudiante
                try {
                    Estudiante estudianteAux = objectMapper.convertValue(response.getBody().get("data"), Estudiante.class);

                    Curso curso = optionalCurso.get();
                    CursoEstudiante cursoEstudiante = new CursoEstudiante();

                    cursoEstudiante.setEstudianteId(estudianteAux.getId());

                    // Agregar la relación al curso
                    curso.addCursoEstudiante(cursoEstudiante);
                    cursoRepository.save(curso);

                    return Optional.of(estudianteAux);
                } catch (Exception e) {
                    // Manejo de errores en caso de fallos de conversión
                    e.printStackTrace();
                }
            }
        }

        return Optional.empty();
    }


    @Override
    public List<Curso> buscarPorCreditos(int creditos) {
        return cursoRepository.findByCreditos(creditos);
    }

    @Override
    public List<Curso> buscarPorFechaCreacionPosterior(Date fecha) {
        return cursoRepository.findByCreadoEnAfter(fecha);
    }

    @Override
    public List<Curso> buscarPorDescripcion(String texto) {
        return cursoRepository.findByDescripcionContaining(texto);
    }
}
