import { Routes } from '@angular/router';
import { InventarioComponent } from './inventario/inventario.component';
import { HomeComponent } from './home/home.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { RegistroAdminComponent } from './registro-admin/registro-admin.component';
import { LoginComponent } from './login/login.component';
import { ReservasComponent } from './reservas/reservas.component'; // Importar el componente de reservas
import { AuthGuard } from './auth.guard';  // Importar el guard

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta para el Home
<<<<<<< HEAD
  { path: 'inventario', component: InventarioComponent}, // Ruta protegida
  { path: 'signup', component: RegistroUsuarioComponent }, // Ruta para registro de Usuario
  { path: 'signupadmin', component: RegistroAdminComponent }, // Ruta para registro de Admin
  { path: 'login', component: LoginComponent }, // Ruta para Login
  { path: 'reservas', component: ReservasComponent}, // Ruta protegida
=======
  { path: 'inventario', component: InventarioComponent }, // Ruta protegida
  { path: 'signup', component: RegistroUsuarioComponent }, // Ruta para registro de Usuario
  { path: 'signupadmin', component: RegistroAdminComponent }, // Ruta para registro de Admin
  { path: 'login', component: LoginComponent }, // Ruta para Login
  { path: 'reservas', component: ReservasComponent }, // Ruta protegida
>>>>>>> main/master
];
