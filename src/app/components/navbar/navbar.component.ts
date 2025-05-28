import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter, takeUntil, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { faFacebook, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

interface MenuItem {
  name: string;
  link: string[];
  fragment: string; // Fragment is now required
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private scrollSubject = new Subject<void>();
  
  isScrolled = false;
  isMobileMenuOpen = false;
  isMenuAnimating = false;

  // Define menu items with router links
  menuItems: MenuItem[] = [
    { name: 'Home', link: ['/home'], fragment: 'hero' },
    { name: 'About', link: ['/about'], fragment: 'about' },
    { name: 'Journey', link: ['/journey'], fragment: 'journey' },
    { name: 'Roadmap', link: ['/roadmap'], fragment: 'roadmap' },
    { name: 'Social', link: ['/social'], fragment: 'social' },
    { name: 'Testimonials', link: ['/testimonials'], fragment: 'testimonials' },
    { name: 'Work', link: ['/work'], fragment: 'work' }
  ];
  
  // Filtered menu items (excluding Journey button)
  get filteredMenuItems(): MenuItem[] {
    return this.menuItems.filter(item => item.name !== 'Journey');
  }

  // Font Awesome icons
  faFacebook = faFacebook;
  faYoutube = faYoutube;
  faInstagram = faInstagram;

  // For active link highlighting
  activeSection: string = 'home';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    // Handle scroll events with debounce
    this.setupScrollListener();
    
    // Subscribe to route changes
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.updateActiveSectionFromUrl();
    });
    
    // Initial update
    this.updateActiveSectionFromUrl();
    
    // Subscribe to scroll events
    this.scrollSubject.pipe(
      debounceTime(50),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.handleScroll();
      this.updateActiveSectionFromScroll();
    });
  }
  
  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.scrollSubject.next();
  }
  
  private setupScrollListener(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.onWindowScroll.bind(this), { passive: true });
    }
  }
  
  private handleScroll(): void {
    this.isScrolled = window.pageYOffset > 50;
  }
  
  private updateActiveSectionFromUrl(): void {
    const url = this.router.url;
    // Extract the fragment from the URL (e.g., 'about' from '/#about')
    const fragment = this.route.snapshot.fragment || 'home';
    this.activeSection = fragment;
    
    // If we have a fragment, scroll to it
    if (fragment) {
      setTimeout(() => {
        this.scrollToSection(fragment);
      }, 0);
    }
  }
  
  private updateActiveSectionFromScroll(): void {
    const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offset = element.offsetTop - 100;
        const height = element.offsetHeight;
        if (scrollPosition >= offset && scrollPosition < offset + height) {
          if (this.activeSection !== section) {
            this.activeSection = section;
            // Update URL without page reload
            history.replaceState(null, '', `#${section}`);
          }
          break;
        }
      }
    }
  }

  async scrollToSection(fragment: string | undefined, event?: Event): Promise<void> {
    if (event) {
      event.preventDefault();
    }
    
    if (!fragment) {
      return Promise.resolve();
    }

    // Map certain fragments to their corresponding sections
    const fragmentMap: { [key: string]: string } = {
      'journey': 'timeline',
      'work': 'collaborations'
    };

    // Use the mapped fragment if it exists
    const targetFragment = fragmentMap[fragment] || fragment;
    
    // Close mobile menu if open
    if (this.isMobileMenuOpen) {
      this.toggleMobileMenu();
      // Small delay to ensure the menu is fully closed before scrolling
      return new Promise(resolve => {
        setTimeout(() => {
          this.scrollToElementById(targetFragment);
          resolve();
        }, 300);
      });
    } else {
      this.scrollToElementById(targetFragment);
      return Promise.resolve();
    }
  }

  private scrollToElementById(id: string): void {
    const element = document.querySelector('#' + id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeSection = id;
    }
  }

  getNavIcon(name: string): string {
    const icons: { [key: string]: string } = {
      'Home': '🏠',
      'About': '👤',
      'Journey': '🗺️',
      'Roadmap': '📍',
      'Social': '📱',
      'Testimonials': '💬',
      'Work': '💼',
      'Contact': '✉️'
    };
    return icons[name] || '';
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Close mobile menu when resizing to desktop
    if (window.innerWidth >= 768) {
      if (this.isMobileMenuOpen) {
        this.isMobileMenuOpen = false;
        document.body.style.overflow = '';
      }
    }
  }

  async toggleMobileMenu(): Promise<void> {
    if (this.isMenuAnimating) return;
    
    this.isMenuAnimating = true;
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    // Prevent body scroll when mobile menu is open
    document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
    
    // Wait for the animation to complete
    await new Promise(resolve => setTimeout(resolve, 500));
    this.isMenuAnimating = false;
  }

  closeMobileMenu(): void {
    if (this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
      document.body.style.overflow = '';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onWindowScroll.bind(this));
    }
  }
}
