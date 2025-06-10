import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service'; // Ajuste o caminho se necessário
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header', // Este é o nome que usaremos para chamar o componente
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  isCompany = false;
  private userSubscription!: Subscription;

  // Injeta o serviço de autenticação que criamos
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // "Escuta" as mudanças no status de login
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.isCompany = user?.user_type === 'company';
    });
  }

  // Limpa a "escuta" para evitar vazamento de memória
  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  // Função para fazer logout
  onLogout(): void {
    this.authService.logout();
  }
}