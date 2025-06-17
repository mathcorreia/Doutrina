import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  currentSlide = 0;
  slides: any;
  dots: any;
  intervalId: any = null;

  constructor() { }

  ngAfterViewInit(): void {
    this.slides = document.querySelectorAll(".carousel-slide");
    this.dots = document.querySelectorAll(".dot");
    if (this.slides.length > 0 && this.dots.length > 0) {
      this.showSlide(0);
      this.intervalId = setInterval(() => this.moveSlide(1), 5000);
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  showSlide(index: number): void {
    if (!this.slides || !this.dots || this.slides.length === 0) return;
    this.slides.forEach((slide: HTMLElement, i: number) => {
      slide.classList.remove("active");
      if (this.dots[i]) this.dots[i].classList.remove("active");
    });
    this.currentSlide = (index + this.slides.length) % this.slides.length;
    if (this.slides[this.currentSlide] && this.dots[this.currentSlide]) {
      this.slides[this.currentSlide].classList.add("active");
      this.dots[this.currentSlide].classList.add("active");
    }
  }

  moveSlide(direction: number): void {
    this.showSlide(this.currentSlide + direction);
  }

  goToSlide(index: number): void {
    this.showSlide(index);
  }
}