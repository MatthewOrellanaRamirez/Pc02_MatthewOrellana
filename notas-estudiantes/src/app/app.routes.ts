import { Routes } from '@angular/router';
import { Estudiantes } from './pages/estudiantes/estudiantes';
import { Detalle } from './pages/detalle/detalle';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'estudiantes',
    pathMatch: 'full'
  },
  {
    path: 'estudiantes',
    component: Estudiantes
  },
  {
    path: 'detalle/:id',
    component: Detalle
  },
  {
    path: '**',
    redirectTo: 'estudiantes'
  }
];