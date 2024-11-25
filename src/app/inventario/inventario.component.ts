import { Component, OnInit } from '@angular/core';
import { LibroService } from '../services/libro.service';
import { LibroComponent } from "../libro/libro.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AutenticacionService } from "../services/autenticacion.service";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
  imports: [LibroComponent, CommonModule, FormsModule]
})
export class InventarioComponent implements OnInit {
  libros: any[] = []; // Aquí se almacenarán los libros
  showDropdown: boolean = false; // Controla la visibilidad del menú desplegable
  mostrarModalEliminar: boolean = false;
  libroSeleccionado: any = null; // Puede ser un objeto o similar
  isAddBookFormVisible: boolean = false; // Controla si el formulario de agregar libro se muestra
  nuevoLibro: any = {  // Inicializamos un objeto vacío para el nuevo libro
    Nombre: '',
    Autor: '',
    ISBN: '',
    Editorial: '',
    GeneroPrincipal: '',
    GeneroSecundario: '',
    AnoPubli: null,
    cantidadDisponible: 1,
    Imagen: ''
  };

  constructor(
    private libroService: LibroService,
    private router: Router,
    private autenticacionService: AutenticacionService // Inyectar el servicio de autenticación
  ) { }

  ngOnInit(): void {
    this.verificarAdmin(); // Verifica si el usuario es admin al cargar el componente
    this.obtenerLibros(); // Llama al servicio para obtener los libros cuando el componente se carga
  }

  // Verifica si el usuario es administrador
  verificarAdmin() {
    if (!this.autenticacionService.isAdmin()) {
      this.router.navigate(['/']); // Redirige al home si no es admin
    }
  }

  // Obtiene los libros del servicio
  obtenerLibros() {
    this.libroService.obtenerLibros().subscribe(libros => {
      this.libros = libros;
    }, error => {
      console.error('Error al obtener los libros:', error);
    });
  }

  // Muestra el modal de confirmación para eliminar un libro
  mostrarModalConfirmacion(libro: any) {
    this.libroSeleccionado = libro;
    this.mostrarModalEliminar = true; // Activa el modal
  // Método para agregar un libro (POST)
  agregarLibro() {
    this.libroService.agregarLibro(this.nuevoLibro).subscribe(
      (response) => {
        console.log('Libro agregado:', response);
        this.obtenerLibros(); // Actualiza la lista de libros después de agregar
        this.isAddBookFormVisible = false; // Oculta el formulario
        this.nuevoLibro = {  // Resetea el formulario
          Nombre: '',
          Autor: '',
          ISBN: '',
          Editorial: '',
          GeneroPrincipal: '',
          GeneroSecundario: '',
          AnoPubli: null,
          cantidadDisponible: 1,
          Imagen: ''
        };
      },
      (error) => {
        console.error('Error al agregar el libro:', error);
        alert('Error al agregar el libro: ' + (error.error?.message || error.message));  // Mostrar un mensaje de error
      }
    );
  }

  // Método para alternar la visibilidad del formulario de agregar libro
  toggleAddBookForm() {
    this.isAddBookFormVisible = !this.isAddBookFormVisible;  // Cambia el estado de visibilidad del formulario
  }

  // Cierra el modal sin eliminar
  cerrarModal() {
    this.mostrarModalEliminar = false;
    this.libroSeleccionado = null; // Resetea el libro seleccionado
  }

  // Elimina el libro seleccionado
  eliminarLibroConfirmado() {
    if (this.libroSeleccionado && this.libroSeleccionado._id) {
      this.libroService.eliminarLibro(this.libroSeleccionado._id).subscribe(response => {
        console.log('Libro eliminado:', response);
        this.obtenerLibros(); // Actualiza la lista de libros
        this.cerrarModal(); // Cierra el modal
      }, error => {
        console.error('Error al eliminar el libro:', error);
      });
    }
  }

  // Redirige al home
  redirectToHome() {
    this.router.navigate(['/']);
  }

  // Alterna el menú desplegable
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  // Navega a la sección de reservas
  navigateToReservas() {
    this.router.navigate(['/reservas']);
    this.showDropdown = false;
  }
}
