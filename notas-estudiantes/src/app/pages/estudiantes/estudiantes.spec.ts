import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  Estudiante,
  EstudianteService
} from '../../services/estudiante';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './estudiantes.html',
  styleUrl: './estudiantes.css'
})
export class Estudiantes implements OnInit {
  estudiantes: Estudiante[] = [];
  cargando = true;
  error = '';

  constructor(private servicio: EstudianteService) {}

  ngOnInit(): void {
    this.servicio.listar().subscribe({
      next: (datos) => {
        this.estudiantes = datos;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los estudiantes.';
        this.cargando = false;
      }
    });
  }
}