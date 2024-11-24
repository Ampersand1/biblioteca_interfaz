import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';  // Asegúrate de importar RouterModule
import { provideHttpClient } from '@angular/common/http';  
import { routes } from './app.routes';
import { LibroService } from './services/libro.service';  

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),  
    LibroService,
    RouterModule  
  ]
};
