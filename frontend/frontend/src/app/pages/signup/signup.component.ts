import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true, // This component is now standalone. If you intend it to be part of a NgModule, remove this line and import in the NgModule instead.
  imports: [
    CommonModule, // Add CommonModule here
    ReactiveFormsModule // Add ReactiveFormsModule here
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      user_type: ['freelancer', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required],
      cpf: [''],
      cnpj: ['']
    }, { validators: this.passwordMatchValidator });

    this.userType.valueChanges.subscribe(userType => {
      this.updateValidators(userType);
    });

    this.updateValidators('freelancer');
  }

  get userType(): AbstractControl {
    return this.signupForm.get('user_type')!;
  }

  updateValidators(userType: string): void {
    const cpfControl = this.signupForm.get('cpf')!;
    const cnpjControl = this.signupForm.get('cnpj')!;

    if (userType === 'freelancer') {
      cpfControl.setValidators([Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)]);
      cnpjControl.clearValidators();
      cnpjControl.setValue('');
    } else if (userType === 'company') {
      cnpjControl.setValidators([Validators.required, Validators.pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/)]);
      cpfControl.clearValidators();
      cpfControl.setValue('');
    }

    cpfControl.updateValueAndValidity();
    cnpjControl.updateValueAndValidity();
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const passwordConfirmation = control.get('password_confirmation');
    if (password && passwordConfirmation && password.value !== passwordConfirmation.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched(); // This will help display validation errors
      return;
    }
    console.log('Dados do formulário:', this.signupForm.value);
    // Aqui viria a chamada para o seu authService.register(...)
  }
}