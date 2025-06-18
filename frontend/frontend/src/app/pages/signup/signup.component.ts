import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

// Validador customizado para comparar as senhas
export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const passwordConfirmation = control.get('password_confirmation');
  
  if (password && passwordConfirmation && password.value !== passwordConfirmation.value) {
    return { passwordMismatch: true };
  }
  
  return null;
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
    let formConfig: any;

    if (this.userType === 'company') {
      formConfig = {
        user_type: ['company'],
        companyName: ['', Validators.required],
        razao_social: ['', Validators.required],
        cnpj: ['', Validators.required],
        data_fundacao: [''],
        telefone: [''],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        password_confirmation: ['', Validators.required]
      };
    } else { // Freelancer
      formConfig = {
        user_type: ['freelancer'],
        name: ['', Validators.required],
        cpf: ['', Validators.required],
        data_nascimento: [''],
        telefone: [''],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        password_confirmation: ['', Validators.required]
      };
    }
    // Adiciona o validador customizado no nível do formulário
    this.signupForm = this.fb.group(formConfig, { validators: passwordMatchValidator });
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    
    const formData = this.signupForm.value;
    if (formData.companyName) {
      formData.name = formData.companyName;
    }

    this.authService.register(formData).subscribe({
      next: (response) => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = 'Erro ao cadastrar. Verifique os dados.';
        console.error(err);
      }
    });
  }
}