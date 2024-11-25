import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutenticacionService } from '../services/autenticacion.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class LoginComponent {
  
  constructor(
    private autenticacionService: AutenticacionService,
    private router: Router  // Inyectar Router para la navegación
  ) {}

  // Función para redirigir según el rol del usuario
  redirectToHomeOrInventory() {
    if (this.autenticacionService.isAdmin()) {
      this.router.navigate(['/inventario']);  // Redirigir al inventario para administradores
    } else {
      this.router.navigate(['/']);  // Redirigir al home para usuarios
    }
  }

  // Función de inicio de sesión
  onSubmit(loginData: any) {
    this.autenticacionService.login(loginData).subscribe(
      (response) => {
        console.log('Sesión iniciada con éxito', response);
        
        // Guardar el token en localStorage
        this.autenticacionService.guardarToken(response.token); // Suponiendo que el token se llama 'token'

        // Redirigir dependiendo del rol
        this.redirectToHomeOrInventory();
      },
      (error) => {
        console.error('Error al iniciar sesión', error);
        alert('Credenciales incorrectas o error en el inicio de sesión.');
      }
    );
  }
}