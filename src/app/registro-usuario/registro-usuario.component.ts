import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Importar Router para redirección
import { AutenticacionService } from '../services/autenticacion.service'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class RegistroUsuarioComponent {

  constructor(
    public autenticacionService: AutenticacionService,
    private router: Router  // Inyectar Router para redirección
  ) { }

  // Método para verificar si las contraseñas coinciden
  isPasswordMatch(): boolean {
    const clave = (document.getElementById('clave') as HTMLInputElement).value;
    const confirmacionClave = (document.getElementById('confirmacionClave') as HTMLInputElement).value;
    return clave === confirmacionClave;
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit(usuarioData: any) {
    if (!this.isPasswordMatch()) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Verifica los datos antes de enviarlos
    console.log('Datos a enviar:', usuarioData);

    this.autenticacionService.registrarUsuario(usuarioData).subscribe(
      (response) => {
        console.log('Usuario registrado con éxito', response);
        this.redirectToLogin();  // Llamamos al método de redirección al home
      },
      (error) => {
        console.error('Error al registrar usuario', error);
      }
    );
  }
  redirectToHome() {
    this.router.navigate(['/']);  // Redirige al home
  }

  // Método para redirigir al home
  redirectToLogin() {
    this.router.navigate(['/login']);  // Redirigir al login
  }
}
