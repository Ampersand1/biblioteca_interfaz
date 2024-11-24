import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutenticacionService } from '../autenticacion.service'; 

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.css'],
  standalone: true,
  imports: [FormsModule] 
})
export class RegistroAdminComponent {

  constructor(private autenticacionService: AutenticacionService) { }

  // Método para verificar si las contraseñas coinciden
  isPasswordMatch(): boolean {
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const confirmPassword = (document.getElementById('confirmPassword') as HTMLInputElement).value;
    return password === confirmPassword;
  }

  onSubmit(adminData: any) {
    // Verificamos que las contraseñas coincidan antes de enviar
    if (!this.isPasswordMatch()) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Si las contraseñas coinciden, proceder con el registro del admin
    this.autenticacionService.registrarAdmin(adminData).subscribe(
      (response) => {
        console.log('Administrador registrado con éxito', response);
      },
      (error) => {
        console.error('Error al registrar administrador', error);
      }
    );
  }
}
