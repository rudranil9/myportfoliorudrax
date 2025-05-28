import { Component, OnInit, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private fragmentSubscription: Subscription = new Subscription();
  private routerEventsSubscription: Subscription = new Subscription();
  activeSection: string = 'home';
  
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    console.log('Home component constructed');
  }

  ngOnInit(): void {
    console.log('Home component initialized');
    
    // Initialize AOS animation library
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
      offset: 50
    });
    
    // Handle fragment navigation
    this.fragmentSubscription = this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.scrollToFragment(fragment);
      }
    });
    
    // Scroll to top on route change
    this.routerEventsSubscription = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });
  }
  
  ngAfterViewInit(): void {
    // Check for fragment after view is initialized
    const fragment = this.route.snapshot.fragment;
    if (fragment) {
      setTimeout(() => this.scrollToFragment(fragment), 0);
    }
    
    console.log('Home component view initialized');
    setTimeout(() => {
      AOS.refresh();
    }, 500);
  }
  
  ngOnDestroy(): void {
    // Clean up subscriptions
    this.fragmentSubscription.unsubscribe();
    this.routerEventsSubscription.unsubscribe();
  }
  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const sections = ['home', 'about', 'timeline', 'social', 'testimonials', 'collaborations', 'contact'];
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offset = element.offsetTop - 100;
        const height = element.offsetHeight;
        if (scrollPosition >= offset && scrollPosition < offset + height) {
          this.activeSection = section;
          break;
        }
      }
    }
  }

  isActive(section: string): boolean {
    return this.activeSection === section;
  }
  
  scrollToSection(section: string, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeSection = section;
    }
  }
  
  // Handle component activation
  onActivate(event: any): void {
    const fragment = this.route.snapshot.fragment;
    if (fragment) {
      this.scrollToFragment(fragment);
    } else {
      window.scrollTo(0, 0);
    }
  }
  
  // Scroll to fragment with smooth behavior
  private scrollToFragment(fragment: string): void {
    try {
      const element = document.querySelector(`#${fragment}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (e) {
      console.error('Error scrolling to fragment:', e);
    }
  }
} 