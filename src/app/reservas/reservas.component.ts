import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../services/reservas.service';
import { AutenticacionService } from '../services/autenticacion.service';
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { FormsModule } from '@angular/forms';
import { SearchService } from '../services/busqueda.service';  
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ReservasComponent implements OnInit {
  reservas: any[] = []; // Lista de reservas del usuario
  token: string = ''; // Token del usuario
  mostrarModal: boolean = false; // Estado para mostrar el modal
  libroSeleccionado: any = null; // Libro seleccionado para eliminar
  mensaje: string = ''; // Mensaje de éxito o error
  searchQuery: string = '';  // Almacena la consulta de búsqueda
  searchResults: any[] = [];  // Almacena los resultados de la búsqueda
  showDropdown: boolean = false; // Controla la visibilidad del menú desplegable
  constructor(
    private reservaService: ReservaService,
    public autenticacionService: AutenticacionService,
    private searchService: SearchService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('accessToken') || ''; // Obtener token
    this.obtenerMisReservas(); // Obtener reservas al iniciar
  }

  // Obtener las reservas del usuario
  obtenerMisReservas(): void {
    if (!this.token) {
      this.mensaje = 'Token no disponible';
      return;
    }

    this.reservaService.obtenerMisReservas(this.token).subscribe(
      (reservas) => {
        this.reservas = reservas;
      },
      (error) => {
        this.mensaje = 'Error al obtener reservas';
      }
    );
  }

  // Mostrar el modal de eliminación
  mostrarModalEliminar(reserva: any): void {
    this.libroSeleccionado = reserva; // Asignar el libro a eliminar
    this.mostrarModal = true; // Mostrar el modal
  }

  // Cerrar el modal
  cerrarModal(): void {
    this.mostrarModal = false;
  }

  // Eliminar reserva
  eliminarReserva(): void {
    if (!this.token || !this.libroSeleccionado) {
      alert('No se pudo eliminar la reserva');
      return;
    }
    console.log('TOKEN:', this.token);
    console.log('ID de la reserva a eliminar:', this.libroSeleccionado.id);

    // Llamar al servicio de eliminación
    this.reservaService.eliminarReserva(this.token, this.libroSeleccionado.id).subscribe(
      (response) => {
        this.cerrarModal(); // Cerrar el modal
        alert('Se ha eliminado la reserva con éxito');
        this.obtenerMisReservas(); // Actualizar lista de reservas
      },
      (error) => {
        this.cerrarModal(); // Cerrar el modal
        alert('Error al eliminar la reserva');
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

