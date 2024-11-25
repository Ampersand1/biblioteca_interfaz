import { Component, OnInit } from '@angular/core';
import { LibroService } from '../services/libro.service';
import { LibroComponent } from "../libro/libro.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AutenticacionService } from "../services/autenticacion.service";

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
  imports: [LibroComponent, CommonModule]
})
export class InventarioComponent implements OnInit {
  libros: any[] = []; // Aquí se almacenarán los libros
  showDropdown: boolean = false; // Controla la visibilidad del menú desplegable
  mostrarModalEliminar: boolean = false;
  libroSeleccionado: any = null; // Puede ser un objeto o similar

  constructor(
    private libroService: LibroService,
    private router: Router,
    private autenticacionService: AutenticacionService
  ) {}

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
