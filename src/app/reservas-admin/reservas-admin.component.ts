import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';
import { SearchService } from '../services/busqueda.service';  
@Component({
  selector: 'app-admin-reserva',
  templateUrl: './reservas-admin.component.html',
  styleUrls: ['./reservas-admin.component.css'],
  imports: [CommonModule, FormsModule] 
})
export class AdminReservaComponent implements OnInit {
  token: string = ''; // Token del administrador
  reservas: any[] = []; // Array para reservas
  reservaId: string = ''; // ID de la reserva para marcar como cumplida o eliminar
  usuario: string = ''; // Nombre del usuario para búsqueda de reservas
  mensaje: string = ''; // Mensaje de error o éxito
  searchQuery: string = '';  // Almacena la consulta de búsqueda
  searchResults: any[] = [];  // Almacena los resultados de la búsqueda
  showDropdown: boolean = false; // Controla la visibilidad del menú desplegable
  constructor(
    private reservaService: ReservaService,
    private router: Router,
    private searchService: SearchService,
    public autenticacionService: AutenticacionService 
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('accessToken') || '';
    this.obtenerReservas(); // Obtener todas las reservas al iniciar
  }

  // Ver todas las reservas (Administrador)
  obtenerReservas(): void {
    if (!this.token) {
      this.mensaje = 'Token no proporcionado';
      return;
    }

    this.reservaService.obtenerReservas(this.token).subscribe(
      (reservas) => {
        this.reservas = reservas;
      },
      (error) => {
        this.mensaje = 'Error al obtener las reservas';
      }
    );
  }

// Método para marcar una reserva como cumplida
marcarCumplida(reservaId: string): void {
    if (!this.token || !reservaId) {
      this.mensaje = 'Token o ID de reserva no proporcionados';
      return;
    }
  
    this.reservaService.marcarCumplida(this.token, reservaId).subscribe(
      (response) => {
        // Actualiza el estado de la reserva en el arreglo local de reservas
        const reserva = this.reservas.find(r => r.id === reservaId);
        if (reserva) {
          reserva.estado = 'Cumplida'; // Cambiar el estado localmente
        }
        this.mensaje = 'Reserva marcada como cumplida';
      },
      (error) => {
        this.mensaje = 'Error al marcar la reserva como cumplida';
      }
    );
  }
  
  

  // Buscar reservas por nombre de usuario (Administrador)
  buscarReservasPorUsuario(): void {
    if (!this.token || !this.usuario) {
      this.mensaje = 'Nombre de usuario no proporcionado';
      return;
    }

    this.reservaService.buscarReservasPorUsuario(this.token, this.usuario).subscribe(
      (reservas) => {
        this.reservas = reservas;
      },
      (error) => {
        this.mensaje = 'Usuario no encontrado.';
      }
    );
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');  // Comprobamos si existe un token en localStorage
  }
  // Redirige al usuario a la página de reservas
  goToReservations() {
    this.router.navigate(['/reservas']);
  }

  //Redirige al usuario a la página de modificar perfil
  goToPerfil() {
    this.router.navigate(['/perfil'])
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  redirectToHome() {
    this.router.navigate(['/']);
  }

  // Método para manejar la búsqueda
  onSearch() {
    if (this.searchQuery.trim()) {
      this.searchService.searchBooks(this.searchQuery).subscribe(
        (data) => {
          this.searchResults = data;  // Guardamos los resultados de la búsqueda
        },
        (error) => {
          console.error('Error al realizar la búsqueda:', error);
          this.searchResults = [];  // Si hay error, vaciar los resultados
        }
      );
    } else {
      this.searchResults = [];  // Si no hay texto, vaciar resultados
    }
  }
}
