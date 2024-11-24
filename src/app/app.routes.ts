import { Routes } from '@angular/router';
import { InventarioComponent } from './inventario/inventario.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta para el Home
  { path: 'inventario', component: InventarioComponent } // Ruta para Inventario
];