import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // RouterModule é necessário para os links

@Component({
  selector: 'app-signup-selection',
  standalone: true,
  imports: [CommonModule, RouterModule], // Adicione os imports aqui
  templateUrl: './signup-selection.component.html',
  styleUrls: ['./signup-selection.component.css']
})
export class SignupSelectionComponent {

}