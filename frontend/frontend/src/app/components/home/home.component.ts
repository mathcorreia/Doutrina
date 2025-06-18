import { Component, AfterViewInit, OnDestroy, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  // Referências seguras aos elementos do carrossel no HTML
  @ViewChildren('slide') slides!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('dot') dots!: QueryList<ElementRef<HTMLElement>>;

  slideIndex = 0;
  slideInterval: any;

  // A lógica do formulário de contato é mantida como estava
  contactForm!: FormGroup;
  formMessage: string | null = null;
  formSuccess: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onContactSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    console.log('Formulário (simulação):', this.contactForm.value);
    this.formMessage = 'Sua mensagem foi recebida com sucesso! (Simulação)';
    this.formSuccess = true;
    this.contactForm.reset();
    setTimeout(() => { this.formMessage = null; }, 5000);
  }

  // --- Lógica do Carrossel (Revisada e Robusta) ---
  ngAfterViewInit(): void {
    // Garante que o carrossel só inicie se houver slides na página
    if (this.slides.length > 0) {
      this.showSlides(this.slideIndex);
      this.startSlideShow();
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.slideInterval);
  }

  startSlideShow(): void {
    this.slideInterval = setInterval(() => {
      this.moveSlide(1);
    }, 5000);
  }

  moveSlide(n: number): void {
    this.showSlides(this.slideIndex += n);
  }

  goToSlide(n: number): void {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n: number): void {
    const slidesArray = this.slides.toArray();
    const dotsArray = this.dots.toArray();
    
    if (slidesArray.length === 0) return;

    if (n >= slidesArray.length) { this.slideIndex = 0; }
    if (n < 0) { this.slideIndex = slidesArray.length - 1; }

    slidesArray.forEach(slide => slide.nativeElement.classList.remove('active'));
    dotsArray.forEach(dot => dot.nativeElement.classList.remove('active'));

    if (slidesArray[this.slideIndex]) {
      slidesArray[this.slideIndex].nativeElement.classList.add('active');
    }
    if (dotsArray[this.slideIndex]) {
      dotsArray[this.slideIndex].nativeElement.classList.add('active');
    }

    clearInterval(this.slideInterval);
    this.startSlideShow();
  }
}