import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./paginas/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'configuracion',
    loadComponent: () => import('./paginas/configuracion/configuracion.page').then( m => m.ConfiguracionPage)
  },
  {
    path: 'gestion-citas',
    loadComponent: () => import('./paginas/gestion-citas/gestion-citas.page').then( m => m.GestionCitasPage)
  },
];
