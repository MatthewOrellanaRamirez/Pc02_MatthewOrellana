import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Estudiante {
  id: number;
  nombre: string;
  nota1: number;
  nota2: number;
  nota3: number;
}

export interface DetalleEstudiante extends Estudiante {
  suma: number;
  promedio: number;
  estado: string;
  observacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private apiUrl =
    'https://careli2021.github.io/api_examen/api/estudiante.json';

  constructor(private http: HttpClient) {}

  listar(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.apiUrl);
  }

  obtenerDetalle(
    id: number
  ): Observable<DetalleEstudiante | undefined> {
    return this.listar().pipe(
      map(estudiantes => {
        const estudiante = estudiantes.find(e => e.id === id);

        if (!estudiante) {
          return undefined;
        }

        const suma =
          estudiante.nota1 +
          estudiante.nota2 +
          estudiante.nota3;

        const promedio = suma / 3;

        return {
          ...estudiante,
          suma,
          promedio,
          estado: promedio >= 13
            ? 'Aprobado'
            : 'Desaprobado',
          observacion: promedio > 17
            ? 'Excelente'
            : promedio >= 13
              ? 'Regular'
              : 'En riesgo'
        };
      })
    );
  }
}