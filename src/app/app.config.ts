import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Asegúrate de importar provideHttpClient
import { routes } from './app.routes';
import { LibroService } from './services/libro.service';  // Asegúrate de importar tu servicio

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),   // Asegúrate de que las rutas estén siendo proporcionadas
    provideHttpClient(),  // Añade el provideHttpClient aquí
    LibroService  // Asegúrate de incluir tu servicio en los proveedores
  ]
};
