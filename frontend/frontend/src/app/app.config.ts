import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        // Habilita a rolagem para a âncora
        anchorScrolling: 'enabled',
        // Restaura a posição do scroll ao usar os botões "voltar" e "avançar" do navegador
        scrollPositionRestoration: 'enabled',
      })
    ),

    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(HttpClientModule)
  ]
};