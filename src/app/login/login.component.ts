import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutenticacionService } from '../autenticacion.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule] 
})
export class LoginComponent {

  constructor(private autenticacionService: AutenticacionService) { }

  onSubmit(loginData: any) {
    this.autenticacionService.login(loginData).subscribe(
      (response) => {
        console.log('Inicio de sesión exitoso', response);
        // Puedes redirigir al usuario a otra página si es necesario
      },
      (error) => {
        console.error('Error al iniciar sesión', error);
        alert('Credenciales incorrectas');
      }
    );
  }
}
