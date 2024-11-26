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
  libros: any[] = []; // Lista de libros
  showDropdown: boolean = false; // Controla la visibilidad del menú desplegable
  mostrarModalEliminar: boolean = false; // Controla si se muestra el modal de eliminación
  libroSeleccionado: any = null; // Libro que se selecciona para eliminar
  isAddBookFormVisible: boolean = false; // Controla si el formulario de agregar libro está visible
  nuevoLibro: any = {  // Datos para un nuevo libro
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
    public autenticacionService: AutenticacionService
  ) {}

  ngOnInit(): void {
    this.verificarAdmin();
    this.obtenerLibros();
  }

  verificarAdmin() {
    if (!this.autenticacionService.isAdmin()) {
      this.router.navigate(['/']);
    }
  }

  obtenerLibros() {
    this.libroService.obtenerLibros().subscribe(
      libros => {
        this.libros = libros;
        console.log(this.libros);  // Verifica que los datos estén correctos
      },
      error => {
        console.error('Error al obtener los libros:', error);
      }
    );
  }
  
  

  // Muestra el modal para confirmar la eliminación
  mostrarModalConfirmacion(libro: any) {
    this.libroSeleccionado = libro;
    this.mostrarModalEliminar = true;
  }

  // Agrega un nuevo libro a través del servicio
  agregarLibro() {
    this.libroService.agregarLibro(localStorage.getItem('accessToken'), this.nuevoLibro).subscribe( //EN EL MÉTODO SE LLAMA DENTRO DE LOS PARAMETROS AL LOCALSTORAGE DE PRIMEROS DE RESTO QUEDA LA LOGICA COMO SEA NECESARIO
      response => {
        console.log('Libro agregado:', response);
        this.obtenerLibros();
        this.cerrarFormularioAgregar();
      },
      error => {
        console.error('Error al agregar el libro:', error);
        alert('Error al agregar el libro: ' + (error.error?.message || error.message));
      }
    );
  }

  // Alterna la visibilidad del formulario de agregar libro
  toggleAddBookForm() {
    this.isAddBookFormVisible = !this.isAddBookFormVisible;
  }

  // Cierra el formulario de agregar libro
  cerrarFormularioAgregar() {
    this.isAddBookFormVisible = false;
    this.nuevoLibro = {
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
  }

  // Cierra el modal de eliminación
  cerrarModal() {
    this.mostrarModalEliminar = false;
    this.libroSeleccionado = null; // Resetea el libro seleccionado
  }
  

  // Confirma la eliminación del libro seleccionado
  eliminarLibroConfirmado(libro: any) {
    if (libro && libro._id) {
      this.libroService.eliminarLibro(libro._id).subscribe(
        response => {
          console.log('Libro eliminado:', response);
          this.obtenerLibros();  // Recargar los libros después de eliminar
        },
        error => {
          console.error('Error al eliminar el libro:', error);
          alert('Error al eliminar el libro');
        }
      );
    }
  }
  
  

  redirectToHome() {
    this.router.navigate(['/inventario']);
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  goToPerfil() {
    this.router.navigate(['/perfil'])
  }

  navigateToReservas() {
    this.router.navigate(['/reservas']);
    this.showDropdown = false;
  }
}
