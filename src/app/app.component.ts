import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import * as AOS from 'aos';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'my-portfolio';
  showScrollButton = false;
  private scrollThreshold = 300;
  private routerSubscription: Subscription | undefined;
  private scrollSubscription: Subscription | undefined;

  constructor(private viewportScroller: ViewportScroller, private router: Router) {
    // Initialize scroll handling
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  ngOnInit() {
    console.log('App component initialized');
    
    // Initialize AOS once for the entire application
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
      offset: 100,
      disable: window.innerWidth < 768
    });

    // Handle route changes
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Scroll to top on route change
      this.viewportScroller.scrollToPosition([0, 0]);
      // Refresh AOS after a short delay
      setTimeout(() => AOS.refresh(), 100);
    });
    
    // Initial scroll position check
    this.checkScrollPosition();
  }
  
  private handleScroll(): void {
    this.checkScrollPosition();
  }
  
  private checkScrollPosition(): void {
    // Make sure we show the button when scrolled down
    this.showScrollButton = window.scrollY > this.scrollThreshold;
    console.log('Scroll position:', window.scrollY, 'Button visible:', this.showScrollButton);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.checkScrollPosition();
  }
  
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
  scrollToTop(): void {
    console.log('Scrolling to top');
    // Using multiple methods for better cross-browser compatibility
    try {
      // Method 1
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Method 2 (for older browsers)
      document.documentElement.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Method 3 (fallback)
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    } catch (e) {
      // Fallback for very old browsers
      window.scrollTo(0, 0);
    }
    
    // Force update button visibility
    setTimeout(() => this.checkScrollPosition(), 100);
  }
  
  ngOnDestroy(): void {
    // Clean up subscriptions and event listeners
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('scroll', this.onWindowScroll);
  }
}
