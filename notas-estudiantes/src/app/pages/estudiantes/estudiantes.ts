import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EstudianteService, Estudiante } from '../../services/estudiante';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './estudiantes.html',
  styleUrl: './estudiantes.css'
})
export class EstudiantesComponent implements OnInit {
  listaEstudiantes: Estudiante[] = [];
  cargando: boolean = true;
  errorMensaje: string = '';

  constructor(
    private estudianteService: EstudianteService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.estudianteService.getEstudiantes().subscribe({
      next: (datos) => {
        this.listaEstudiantes = datos;
        this.cargando = false;
        this.cdr.markForCheck(); // Fuerza la actualización de la vista en modo zoneless
      },
      error: (err) => {
        console.error('Error al cargar la API:', err);
        this.errorMensaje = 'No se pudo cargar la información de los estudiantes.';
        this.cargando = false;
        this.cdr.markForCheck();
      }
    });
  }
}