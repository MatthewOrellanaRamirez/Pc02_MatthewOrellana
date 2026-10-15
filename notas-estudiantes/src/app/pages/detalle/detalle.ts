import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  DetalleEstudiante,
  EstudianteService
} from '../../services/estudiante';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css'
})
export class Detalle implements OnInit {
  estudiante?: DetalleEstudiante;
  cargando = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private servicio: EstudianteService
  ) {}

  ngOnInit(): void {
    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!Number.isInteger(id) || id <= 0) {
      this.error = 'Identificador no válido.';
      this.cargando = false;
      return;
    }

    this.servicio.obtenerDetalle(id).subscribe({
      next: (datos) => {
        this.estudiante = datos;

        if (!datos) {
          this.error = 'No se encontró al estudiante.';
        }

        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el detalle.';
        this.cargando = false;
      }
    });
  }
}