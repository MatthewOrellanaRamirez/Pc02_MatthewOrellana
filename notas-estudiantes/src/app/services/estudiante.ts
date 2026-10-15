import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Estudiante {
  id: number;
  nombre: string;
  nota1: number;
  nota2: number;
  nota3: number;
  suma: number;
  promedio: number;
  estado: string;
  observacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private apiUrl = 'https://careli2021.github.io/api_examen/api/estudiante.json';

  constructor(private http: HttpClient) {}

  // Procesa cada elemento para calcular notas, promedio, estado y observación
  private transformar(item: any, index: number): Estudiante {
    const id = item.id !== undefined && item.id !== null ? Number(item.id) : index + 1;
    const nombre = item.nombre || item.Nombre || item.name || 'Sin nombre';
    
    // Convertir notas a número asegurando valores válidos
    const n1 = Number(item.nota1 ?? item.Nota1 ?? item.nota_1 ?? 0);
    const n2 = Number(item.nota2 ?? item.Nota2 ?? item.nota_2 ?? 0);
    const n3 = Number(item.nota3 ?? item.Nota3 ?? item.nota_3 ?? 0);

    const suma = +(n1 + n2 + n3).toFixed(2);
    const promedio = +(suma / 3).toFixed(2);

    // Estado: Aprobado si >= 13, Desaprobado si < 13
    const estado = promedio >= 13 ? 'Aprobado' : 'Desaprobado';

    // Observación:
    // - Excelente: mayor a 17
    // - Regular: entre 13 y 16.99
    // - En riesgo: menor a 13
    let observacion = '';
    if (promedio > 17) {
      observacion = 'Excelente';
    } else if (promedio >= 13) {
      observacion = 'Regular';
    } else {
      observacion = 'En riesgo';
    }

    return {
      id,
      nombre,
      nota1: n1,
      nota2: n2,
      nota3: n3,
      suma,
      promedio,
      estado,
      observacion
    };
  }

  getEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data.map((item, index) => this.transformar(item, index)))
    );
  }

  getEstudiantePorId(id: number): Observable<Estudiante | undefined> {
    return this.getEstudiantes().pipe(
      map(lista => lista.find(e => e.id === id))
    );
  }
}