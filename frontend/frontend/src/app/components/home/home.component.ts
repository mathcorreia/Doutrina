import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  currentSlide = 0;
  slides: NodeListOf<HTMLElement> | undefined;
  dots: NodeListOf<HTMLElement> | undefined;
  slideInterval: any;

  ngAfterViewInit(): void {
    this.slides = document.querySelectorAll(".carousel-slide");
    this.dots = document.querySelectorAll(".dot");

    // VERIFICAÇÃO PRINCIPAL: Só continue se o carrossel realmente existir na página.
    if (this.slides && this.slides.length > 0) {
      this.showSlide(0);

      this.slideInterval = setInterval(() => {
        this.moveSlide(1);
      }, 5000);
    }
  }

  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  showSlide(index: number): void {
    // Verificações de segurança para evitar erros
    if (!this.slides || this.slides.length === 0 || !this.dots || this.dots.length === 0) {
      return;
    }

    this.slides.forEach((slide) => slide.classList.remove("active"));
    this.dots.forEach((dot) => dot.classList.remove("active"));

    this.currentSlide = (index + this.slides.length) % this.slides.length;

    this.slides[this.currentSlide].classList.add("active");
    this.dots[this.currentSlide].classList.add("active");
  }

  moveSlide(direction: number): void {
    this.showSlide(this.currentSlide + direction);
  }

  goToSlide(index: number): void {
    this.showSlide(index);
  }
}