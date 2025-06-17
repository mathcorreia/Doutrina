import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup-selection',
  standalone: true,
  imports: [RouterLink],
  // CORREÇÃO 2: Apontando para o arquivo HTML correto.
  templateUrl: './signup-selection.component.html', 
  styleUrls: ['./signup-selection.component.css']
})
// CORREÇÃO 1: Adicionando a palavra "export" antes de "class".
export class SignupSelectionComponent {

  constructor() { }

}