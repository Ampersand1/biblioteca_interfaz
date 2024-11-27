import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../services/usuario.service';
import { AutenticacionService } from '../services/autenticacion.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class PerfilComponent implements OnInit {
  userData = {
    usuario: '',
    correo: '',
    clave: '',
    nuevaClave: '',
    confirmacionNuevaClave: ''
  };

  mensaje: string = '';
  error: string = '';
  loading: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    public autenticacionService: AutenticacionService,
    private router: Router
  ) { }

  ngOnInit() {
    // Obtener los datos del usuario logueado
    const currentUser = this.autenticacionService.getCurrentUser();
  
    if (currentUser) {
      // Asignar los datos al modelo
      this.userData.usuario = currentUser.usuario;
      this.userData.correo = currentUser.correo;
    } else {
      // Redirigir al login si no está logueado
      this.router.navigate(['/login']);
    }
  }
  

  onSubmit() {
    if (this.userData.nuevaClave && this.userData.nuevaClave !== this.userData.confirmacionNuevaClave) {
      this.error = 'Las contraseñas nuevas no coinciden';
      return;
    }

    if (!this.userData.clave) {
      this.error = 'Debes ingresar tu contraseña actual';
      return;
    }

    this.loading = true;
    this.error = '';
    this.mensaje = '';

    const datosActualizacion = {
      usuario: this.userData.usuario,
      correo: this.userData.correo,
      clave: this.userData.clave,
      nuevaClave: this.userData.nuevaClave || undefined
    };

    this.usuarioService.actualizarUsuario(localStorage.getItem('accessToken'), datosActualizacion).subscribe(
      (response) => {
        this.mensaje = 'Perfil actualizado exitosamente';
        this.loading = false;
        if (response.token) {
          this.autenticacionService.guardarToken(response.token);
        }
      },
      (error) => {
        this.error = error.error.error || 'Error al actualizar el perfil';
        this.loading = false;
      }
    );
  }

  confirmarEliminacion() {
    const confirmar = confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible.');
    if (confirmar) {
      this.eliminarCuenta();
    }
  }

  // Llamada al servicio para eliminar la cuenta
  eliminarCuenta() {
    this.loading = true;
    this.error = '';
    this.mensaje = '';

    this.usuarioService.eliminarCuenta(localStorage.getItem('accessToken')).subscribe(
      (response) => {
        this.mensaje = 'Cuenta eliminada con éxito';
        this.loading = false;
        this.autenticacionService.logout(); // Si la cuenta es eliminada, se cierra la sesión
        this.router.navigate(['/']); // Redirige al home
      },
      (error) => {
        this.error = error.error.error || 'Error al eliminar la cuenta';
        this.loading = false;
      }
    );
  }
}