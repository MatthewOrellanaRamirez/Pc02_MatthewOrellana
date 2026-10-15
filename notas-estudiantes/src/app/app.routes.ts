import { Routes } from '@angular/router';
import { EstudiantesComponent } from './pages/estudiantes/estudiantes';
import { DetalleComponent } from './pages/detalle/detalle';

export const routes: Routes = [
  { path: '', redirectTo: 'estudiantes', pathMatch: 'full' },
  { path: 'estudiantes', component: EstudiantesComponent },
  { path: 'detalle/:id', component: DetalleComponent },
  { path: '**', redirectTo: 'estudiantes' }
];
