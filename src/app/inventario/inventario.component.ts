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
  libros: any[] = [];  // Aquí se almacenarán los libros
  showDropdown: boolean = false; // Controla la visibilidad del menú desplegable
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

  // Inyectamos el servicio Router y AutenticacionService en el constructor
  constructor(
    private libroService: LibroService,
    private router: Router,
    private autenticacionService: AutenticacionService // Inyectar el servicio de autenticación
  ) { }

  ngOnInit(): void {
    this.verificarAdmin();  // Verifica si el usuario es admin al cargar el componente
    this.obtenerLibros();    // Llama al servicio para obtener los libros cuando el componente se carga
  }

  // Método para verificar si el usuario es administrador
  verificarAdmin() {
    if (!this.autenticacionService.isAdmin()) {  // Verifica si el usuario es admin
      this.router.navigate(['/']);  // Redirige al home si no es admin
    }
  }

  // Método para obtener los libros (GET)
  obtenerLibros() {
    this.libroService.obtenerLibros().subscribe(libros => {
      this.libros = libros;  // Asigna los libros obtenidos al array de libros
    }, error => {
      console.error('Error al obtener los libros:', error);
    });
  }

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

  // Método para modificar un libro
  modificarLibro(id: string, libro: any) {
    this.libroService.actualizarLibro(id, libro).subscribe(response => {
      console.log('Libro actualizado:', response);
      this.obtenerLibros(); // Actualiza la lista de libros después de modificar
    }, error => {
      console.error('Error al modificar el libro:', error);
    });
  }

  // Método para eliminar un libro
  eliminarLibro(id: string) {
    this.libroService.eliminarLibro(id).subscribe(response => {
      console.log('Libro eliminado:', response);
      this.obtenerLibros(); // Actualiza la lista de libros después de eliminar
    }, error => {
      console.error('Error al eliminar el libro:', error);
    });
  }

  // Método para redirigir al home
  redirectToHome() {
    this.router.navigate(['/']);  // Redirige al home
  }

  // Método para alternar el menú desplegable
  toggleDropdown() {
    this.showDropdown = !this.showDropdown; // Cambia el estado del menú
  }

  // Método para navegar a la sección de reservas
  navigateToReservas() {
    this.router.navigate(['/reservas']); // Redirige a la ruta de reservas
    this.showDropdown = false; // Cierra el menú desplegable
  }
}
