import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EstudianteService, Estudiante } from '../../services/estudiante';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css'
})
export class DetalleComponent implements OnInit {
  estudiante?: Estudiante;
  cargando: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private estudianteService: EstudianteService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.estudianteService.getEstudiantePorId(id).subscribe({
      next: (encontrado) => {
        this.estudiante = encontrado;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.cargando = false;
        this.cdr.markForCheck();
      }
    });
  }
}