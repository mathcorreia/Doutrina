import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const passwordConfirmation = control.get('password_confirmation');
  return (password && passwordConfirmation && password.value !== passwordConfirmation.value) ? { passwordMismatch: true } : null;
};

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  userType: 'freelancer' | 'company' = 'freelancer';
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const type = params.get('type');
      this.userType = (type === 'company') ? 'company' : 'freelancer';
      this.initializeForm();
    });
  }

  initializeForm(): void {
    // Lógica unificada para criar o formulário
    this.signupForm = this.fb.group({
      user_type: [this.userType],
      name: ['', Validators.required], // 'name' é a base para ambos os tipos
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required],
      telefone: ['', Validators.required],
    }, { validators: passwordMatchValidator });

    if (this.userType === 'company') {
      this.signupForm.addControl('razao_social', this.fb.control('', Validators.required));
      this.signupForm.addControl('cnpj', this.fb.control('', Validators.required));
      this.signupForm.addControl('data_fundacao', this.fb.control('', Validators.required));
    } else { // Freelancer
      this.signupForm.addControl('cpf', this.fb.control('', Validators.required));
      this.signupForm.addControl('data_nascimento', this.fb.control('', Validators.required));
    }
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      this.errorMessage = "Por favor, preencha todos os campos obrigatórios.";
      return;
    }

    this.authService.register(this.signupForm.value).subscribe({
      next: (response) => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        // Lógica para mostrar o erro exato da validação do backend
        if (err.status === 422 && err.error.errors) {
            const errors = err.error.errors;
            const firstErrorField = Object.keys(errors)[0];
            this.errorMessage = errors[firstErrorField][0];
        } else {
            this.errorMessage = err.error?.message || 'Erro ao cadastrar. Verifique os dados.';
        }
        console.error(err);
      }
    });
  }
}