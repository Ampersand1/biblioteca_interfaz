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

  // Función para redirigir al Home
  redirectToHome() {
    this.router.navigate(['/']);  // Redirige al Home
  }

  // Función de inicio de sesión
  onSubmit(loginData: any) {
    this.autenticacionService.login(loginData).subscribe(
      (response) => {
        console.log('Sesión iniciada con éxito', response);
        this.redirectToHome();  // Redirige al Home después de un inicio de sesión exitoso
      },
      (error) => {
        console.error('Error al iniciar sesión', error);
        alert('Credenciales incorrectas o error en el inicio de sesión.');
      }
    );
  }
}
