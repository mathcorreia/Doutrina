import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  // Importamos RouterModule para <router-outlet> e HeaderComponent para <app-header>
  imports: [RouterModule, HeaderComponent],
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
}