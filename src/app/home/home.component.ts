import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../services/busqueda.service';  // Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { FormsModule } from '@angular/forms';
import { AutenticacionService } from '../services/autenticacion.service';
import { ReservaService } from '../services/reservas.service'; 
import { LibroService } from '../services/libro.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,  // Marca este componente como standalone
  imports: [CommonModule, FormsModule]  // Asegúrate de importar CommonModule
})
export class HomeComponent {
  librosAleatorios: any[] = [];
  mostrarAlerta: boolean = false;  // Variable para mostrar la alerta
  searchQuery: string = '';  // Almacena la consulta de búsqueda
  searchResults: any[] = [];  // Almacena los resultados de la búsqueda
  showDropdown: boolean = false; // Controla la visibilidad del menú desplegable
  isModalVisible: boolean = false; // Controla la visibilidad del modal
  libroSeleccionado: any; // El libro seleccionado para la reserva
  token: string = ''; // Token del administrador
  constructor(
    private router: Router,
    private searchService: SearchService,
    public autenticacionService: AutenticacionService,  // Inyectamos el servicio de búsqueda
    private reservaService: ReservaService,
    private libroService: LibroService
  ) { }
  ngOnInit(): void {
    this.token = localStorage.getItem('accessToken') || '';  // Recuperar el token de la sesión
    this.cargarLibrosAleatorios();
  }
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');  // Comprobamos si existe un token en localStorage
  }
  // Redirige al usuario a la página de reservas
  goToReservations() {
    this.router.navigate(['/reservas']);
  }
  cargarLibrosAleatorios(): void {
    this.libroService.obtenerLibrosAleatorios().subscribe({
      next: (libros) => {
        this.librosAleatorios = libros;
      },
      error: (err) => {
        console.error('Error al obtener libros aleatorios:', err);
      },
    });
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

  // Método para reservar un libro
  reservarLibro() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      this.mostrarAlerta = true;  // Muestra el mensaje si el usuario no está logueado
    } else {
      console.log('Libro reservado');
      // Aquí iría la lógica de la reserva del libro
    }
  }
  // Función para agrupar libros de a 2
  groupBooks(libros: any[], size: number): any[][] {
    const grouped = [];
    for (let i = 0; i < libros.length; i += size) {
      grouped.push(libros.slice(i, i + size));
    }
    return grouped;
  }
  // Método para cerrar la alerta
  cerrarAlerta() {
    this.mostrarAlerta = false;  // Cierra el mensaje de alerta
  }

  // Mostrar el modal y seleccionar el libro
  mostrarModal(book: any): void {
    this.libroSeleccionado = book; // Asigna el libro seleccionado
    this.isModalVisible = true; // Muestra el modal
  }

  // Cerrar el modal
  cerrarModal(): void {
    this.isModalVisible = false;
  }

// Confirmar la reserva
confirmarReserva(): void {
  console.log('Token:', this.token); // Verifica si el token está presente
  console.log('Libro seleccionado:', this.libroSeleccionado); // Verifica si el libro está seleccionado

  if (!this.token || !this.libroSeleccionado) {
    alert('Error: No se pudo realizar la reserva');
    return;
  }

  const inventarioId = this.libroSeleccionado._id; // Asegúrate de que cada libro tenga un ID único

  // Llamar al servicio de reserva
  this.reservaService.crearReserva(this.token, inventarioId).subscribe(
    (response) => {
      this.cerrarModal(); // Cerrar el modal
      alert('Su libro fue reservado con éxito');
    },
    (error) => {
      this.cerrarModal(); // Cerrar el modal
      
      // Verificar si el código de error es 400
      if (error.status === 400) {
        alert('El libro ya está reservado');
      } else {
        alert('Hubo un error al intentar reservar el libro');
      }
  
      // Mostrar detalles del error en la consola
      console.error('Detalles del error:', error);
      if (error.error) {
        console.error('Detalles de la respuesta del error:', error.error);
      }
    }
  );
  
}


}
