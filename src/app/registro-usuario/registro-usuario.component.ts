// src/app/registro-usuario/registro-usuario.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { AutenticacionService } from '../autenticacion.service'; 

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css'],
  standalone: true,
  imports: [FormsModule] 
})
export class RegistroUsuarioComponent {

  constructor(private autenticacionService: AutenticacionService) { }

  isPasswordMatch(): boolean {
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const confirmPassword = (document.getElementById('confirmPassword') as HTMLInputElement).value;
    return password === confirmPassword;
  }

  onSubmit(usuarioData: any) {
    if (!this.isPasswordMatch()) {
      alert('Las contraseñas no coinciden');
      return;
    }

    this.autenticacionService.registrarUsuario(usuarioData).subscribe(
      (response) => {
        console.log('Usuario registrado con éxito', response);
      },
      (error) => {
        console.error('Error al registrar usuario', error);
      }
    );
  }
}
