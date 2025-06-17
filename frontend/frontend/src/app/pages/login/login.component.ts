import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Declara a propriedade do formulário
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Inicializa o formulário com seus campos e validações
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // Função chamada quando o formulário é enviado
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
      return;
    }

    this.errorMessage = null;

    // Chama o serviço de autenticação para fazer a requisição à API
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        // Se o login for bem-sucedido, navega para a página principal
        alert('Login realizado com sucesso!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        // Se der erro, mostra uma mensagem para o usuário
        this.errorMessage = 'E-mail ou senha inválidos. Tente novamente.';
        console.error('Erro de login:', err);
      }
    });
  }
}