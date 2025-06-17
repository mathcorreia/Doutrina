import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // Importe o RouterLink para os links funcionarem

@Component({
  selector: 'app-signup-selection',
  standalone: true,
  imports: [RouterLink], // Adicione RouterLink aos imports
  templateUrl: './signup-selection.component.html',
  styleUrls: ['./signup-selection.component.css']
})
export class SignupSelectionComponent {

  constructor() { }

}