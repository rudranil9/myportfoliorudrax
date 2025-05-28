import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as AOS from 'aos';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-social-showcase',
  templateUrl: './social-showcase.component.html',
  styleUrls: ['./social-showcase.component.scss']
})
export class SocialShowcaseComponent implements OnInit, AfterViewInit {
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // Initialize AOS with appropriate settings
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: false,
      mirror: true,
      offset: 100
    });
    
    // Ensure all elements are visible by default
    gsap.set('.platform-card, .content-card, .social-cta-btn', {
      opacity: 1,
      y: 0,
      scale: 1,
      visibility: 'visible'
    });
  }

  ngAfterViewInit(): void {
    // Ensure DOM is ready
    requestAnimationFrame(() => {
      this.initializeAnimations();
      this.cdr.detectChanges();
    });
  }

  private initializeAnimations(): void {
    // Reset scroll triggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
    ScrollTrigger.refresh();

    // Animate platform cards with staggered entrance
    const platformCards = gsap.utils.toArray('.platform-card');
    if (platformCards.length > 0) {
      gsap.fromTo(platformCards,
        {
          opacity: 0,
          y: 30,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: {
            amount: 0.3,
            from: 'start'
          },
          scrollTrigger: {
            trigger: '.social-platforms',
            start: 'top 85%',
            once: true
          }
        }
      );
    }

    // Ensure all stats elements are visible
    gsap.to('.stats-grid .stat-box', {
      opacity: 1,
      stagger: 0.1,
      duration: 0.5,
      scrollTrigger: {
        trigger: '.stats-grid',
        start: 'top 90%',
        once: true
      }
    });

    // Animate content cards - target group class for new design
    const contentCards = gsap.utils.toArray('.featured-content .content-card');
    if (contentCards.length > 0) {
      gsap.to(contentCards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.featured-content',
          start: 'top 80%',
          once: true
        }
      });
    }

    // Animate the new CTA buttons
    const ctaButtons = gsap.utils.toArray('.social-cta-btn');
    if (ctaButtons.length > 0) {
      gsap.to(ctaButtons, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.cta-container',
          start: 'top 85%',
          once: true
        }
      });
    }

    // Add a subtle entrance animation for decorative elements
    gsap.fromTo('.blur-3xl, .pattern-dots', 
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 1.5,
        ease: 'power1.inOut'
      }
    );
  }
}
