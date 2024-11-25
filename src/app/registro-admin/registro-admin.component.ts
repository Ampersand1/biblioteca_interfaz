import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutenticacionService } from '../services/autenticacion.service'; 

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
    const clave = (document.getElementById('clave') as HTMLInputElement).value;
    const confirmacionClave = (document.getElementById('confirmacionClave') as HTMLInputElement).value;
    return clave === confirmacionClave;
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
