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
    window.addEventListener('scroll', this.handleScroll);
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
    this.showScrollButton = window.pageYOffset > this.scrollThreshold;
  }
  
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
  }
}
