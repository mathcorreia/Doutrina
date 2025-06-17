import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required],
      user_type: ['freelancer', Validators.required], // 'freelancer' ou 'company'
      cpf: [''],
      cnpj: ['']
    });
  }

  get userType() {
    return this.signupForm.get('user_type');
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      return;
    }

    this.authService.signup(this.signupForm.value).subscribe({
      next: () => {
        alert('Cadastro realizado com sucesso! Faça o login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = 'Erro ao cadastrar. Verifique seus dados.';
        console.error(err);
      }
    });
  }
}