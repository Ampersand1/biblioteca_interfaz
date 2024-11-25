import { Component, OnInit } from '@angular/core';
import { LibroService } from '../services/libro.service';
import { LibroComponent } from "../libro/libro.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
  imports: [LibroComponent, CommonModule]
})
export class InventarioComponent implements OnInit {
  libros: any[] = [];  // Aquí se almacenarán los libros
  showDropdown: boolean = false; // Controla la visibilidad del menú desplegable

  // Inyectamos el servicio Router en el constructor
  constructor(private libroService: LibroService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerLibros(); // Llama al servicio para obtener los libros cuando el componente se carga
  }

  // Método para obtener los libros (GET)
  obtenerLibros() {
    this.libroService.obtenerLibros().subscribe(libros => {
      this.libros = libros;  // Asigna los libros obtenidos al array de libros
    }, error => {
      console.error('Error al obtener los libros:', error);
    });
  }

  // Método para agregar un libro
  agregarLibro(libro: any) {
    this.libroService.agregarLibro(libro).subscribe(response => {
      console.log('Libro agregado:', response);
      this.obtenerLibros(); // Actualiza la lista de libros después de agregar
    }, error => {
      console.error('Error al agregar el libro:', error);
    });
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
