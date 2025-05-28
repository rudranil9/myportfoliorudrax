import { Component, OnInit, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition, query, stagger, keyframes } from '@angular/animations';
import { Router } from '@angular/router';

type Platform = 'facebook' | 'youtube' | 'instagram';

interface Stat {
  value: number;
  target: number;
  suffix: string;
  display: string;
}

interface Stats {
  [key: string]: Stat;
  facebook: Stat;
  youtube: Stat;
  instagram: Stat;
}

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.6s cubic-bezier(0.4, 0, 0.2, 1)', style({ 
          opacity: 1, 
          transform: 'translateY(0)' 
        }))
      ])
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('150ms', [
            animate('0.8s cubic-bezier(0.4, 0, 0.2, 1)', 
              style({ opacity: 1, transform: 'translateY(0)' })
            )
          ])
        ], { optional: true })
      ])
    ]),
    trigger('pulse', [
      transition(':increment', [
        animate('0.5s ease-in-out', 
          keyframes([
            style({ transform: 'scale(1)', offset: 0 }),
            style({ transform: 'scale(1.1)', offset: 0.5 }),
            style({ transform: 'scale(1)', offset: 1.0 })
          ])
        )
      ])
    ])
  ]
})
export class HeroComponent implements OnInit, OnDestroy {
  @ViewChild('heroVideo', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;
  
  // Video properties
  videoSource: string = 'assets/videos/hero-bg.mp4';
  isVideoLoaded: boolean = false;
  showFallbackImage: boolean = false;
  
  // Typing animation properties
  currentRole: string = '';
  roles: string[] = [
    'Educational Content',
    'Engaging Videos',
    'Digital Stories',
    'Social Media Magic',
    'Brand Campaigns'
  ];
  
  // Animation timing
  private typingSpeed: number = 80; // ms per character
  private erasingSpeed: number = 40; // ms per character when erasing
  private newTextDelay: number = 2000; // Delay between current and next text
  private charIndex: number = 0;
  private roleIndex: number = 0;
  private timeoutId: any;
  private observer: IntersectionObserver | null = null;
  private isVisible: boolean = false;

  // Stats with animation triggers
  stats: Stats = {
    facebook: { value: 0, target: 325, suffix: 'K+', display: '0' },
    youtube: { value: 0, target: 8, suffix: 'K+', display: '0' },
    instagram: { value: 0, target: 5.5, suffix: 'K+', display: '0' }
  };

  constructor(private router: Router, private el: ElementRef) {}

  ngOnInit(): void {
    this.setupIntersectionObserver();
    this.startTypingAnimation();
    this.animateStats();
    
    // Check if video is already loaded (for browser back navigation)
    if (this.videoElement.nativeElement.readyState >= 2) {
      const event = new Event('loadeddata');
      Object.defineProperty(event, 'target', { value: this.videoElement.nativeElement });
      this.onVideoLoaded(event);
    }
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  @HostListener('window:beforeunload')
  cleanup(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  onVideoLoaded(event: Event): void {
    const video = event.target as HTMLVideoElement;
    
    // Set video to loop
    video.loop = true;
    
    // Mute video (required for autoplay in most browsers)
    video.muted = true;
    
    // Try to play the video
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isVideoLoaded = true;
          this.showFallbackImage = false;
        })
        .catch(error => {
          console.error('Video play failed:', error);
          this.handleVideoError();
        });
    }
  }

  onVideoError(event: Event): void {
    console.error('Error loading video:', event);
    this.handleVideoError();
  }

  private handleVideoError(): void {
    this.showFallbackImage = true;
    // You could set a fallback image source here if needed
  }

  private setupIntersectionObserver(): void {
    // Skip if IntersectionObserver is not supported
    if (typeof IntersectionObserver === 'undefined') {
      this.isVisible = true;
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.isVisible = true;
            const video = this.videoElement.nativeElement;
            
            // Only try to play if we haven't already loaded the video
            if (!this.isVideoLoaded && !this.showFallbackImage) {
              video.play().catch(error => {
                console.error('Autoplay failed:', error);
                this.handleVideoError();
              });
            }
          } else {
            this.isVisible = false;
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    if (this.el?.nativeElement) {
      this.observer.observe(this.el.nativeElement);
    }
  }

  private startTypingAnimation(): void {
    if (!this.roles || this.roles.length === 0) {
      console.warn('No roles defined for typing animation');
      return;
    }
    
    // Initial delay before starting the animation
    this.timeoutId = setTimeout(() => {
      this.typeText();
    }, 1000);
  }

  private typeText(): void {
    if (this.charIndex < this.roles[this.roleIndex].length) {
      this.currentRole = this.roles[this.roleIndex].substring(0, this.charIndex + 1);
      this.charIndex++;
      this.timeoutId = setTimeout(() => this.typeText(), this.typingSpeed);
    } else {
      // Text fully typed, wait then start erasing
      this.timeoutId = setTimeout(() => this.eraseText(), this.newTextDelay);
    }
  }

  private eraseText(): void {
    if (this.charIndex > 0) {
      this.currentRole = this.roles[this.roleIndex].substring(0, this.charIndex - 1);
      this.charIndex--;
      this.timeoutId = setTimeout(() => this.eraseText(), this.erasingSpeed);
    } else {
      // Move to next role in the array
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      // Small delay before starting to type the next text
      this.timeoutId = setTimeout(() => this.typeText(), this.typingSpeed * 2);
    }
  }

  private animateStats(): void {
    // Only animate stats when component is in view
    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateStat('facebook');
          this.animateStat('youtube');
          this.animateStat('instagram');
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });

    if (this.el?.nativeElement) {
      observer.observe(this.el.nativeElement);
    }
  }

  private animateStat(platform: keyof Stats): void {
    const stat = this.stats[platform];
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    const startValue = 0;
    const endValue = stat.target;
    
    const easeOutQuad = (t: number): number => t * (2 - t);
    
    const animate = (currentTime: number): void => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      const currentValue = Math.floor(easeOutQuad(progress) * (endValue - startValue));
      
      stat.value = currentValue;
      
      // Format the display value
      if (endValue >= 1000) {
        stat.display = (currentValue / 1000).toFixed(1) + stat.suffix;
      } else {
        stat.display = currentValue.toFixed(1);
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }
  
  // Helper method to format numbers with commas
  formatNumber(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  
  // Handle window resize for responsive adjustments
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    // Add any responsive adjustments here
  }
  
  // Handle scroll events
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    // Add any scroll-based effects here
  }

  // Method to scroll to a specific section
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
