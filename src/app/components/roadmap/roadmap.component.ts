import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { trigger, transition, style, animate, state, query, stagger, animateChild } from '@angular/animations';
import { 
  faRocket, 
  faChartLine, 
  faLightbulb, 
  faUsers, 
  faCode, 
  faMobile, 
  faGlobe,
  faHandshake,
  faPlayCircle,
  faFire,
  faPalette,
  faSpinner,
  faRoad,
  faMapMarkerAlt,
  faCompass,
  faTrophy,
  faNetworkWired,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';

interface RoadmapItem {
  year: number;
  month: string;
  title: string;
  description: string;
  icon: IconDefinition;
  completed: boolean;
  animationState?: string;
  color: string;
  delay?: number;
}

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('cyberReveal', [
      transition(':enter', [
        query('.cyber-milestone', [
          style({ opacity: 0 }),
          stagger(150, [
            animate('0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('slideInMilestone', [
      state('hidden', style({ 
        opacity: 0,
        transform: 'translateY(30px)'
      })),
      state('visible', style({ 
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('hidden => visible', [
        animate('0.6s 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)')
      ])
    ]),
    trigger('timelineDot', [
      state('void', style({ transform: 'scale(0)' })),
      state('*', style({ transform: 'scale(1)' })),
      transition('void => *', [
        animate('0.6s cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ]),
    trigger('cyberGlitch', [
      state('normal', style({ transform: 'translateX(0)' })),
      state('glitch', style({ transform: 'translateX(2px)' })),
      transition('normal <=> glitch', animate('0.1s cubic-bezier(0.4, 0, 0.2, 1)'))
    ]),
    trigger('roadEntrance', [
      transition(':enter', [
        style({ height: 0 }),
        animate('1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)', style({ height: '100%' }))
      ])
    ])
  ]
})
export class RoadmapComponent implements OnInit, OnDestroy {
  currentYear: number = new Date().getFullYear();
  // Font Awesome Icons
  faRocket = faRocket;
  faChartLine = faChartLine;
  faLightbulb = faLightbulb;
  faUsers = faUsers;
  faCode = faCode;
  faMobile = faMobile;
  faGlobe = faGlobe;
  faHandshake = faHandshake;
  faPlayCircle = faPlayCircle;
  faFire = faFire;
  faPalette = faPalette;
  faSpinner = faSpinner;
  faRoad = faRoad;
  faMapMarkerAlt = faMapMarkerAlt;
  faCompass = faCompass;
  faTrophy = faTrophy;
  faNetworkWired = faNetworkWired;
  
  // Track if the roadmap is in view for animations
  isRoadmapInView: boolean = false;
  scrollHandler: any;
  resizeHandler: any;
  
  // Custom color map for milestones
  colorMap: {[key: string]: string} = {
    'from-blue-400 to-blue-600': 'rgb(59, 130, 246)',
    'from-purple-400 to-purple-600': 'rgb(147, 51, 234)',
    'from-pink-400 to-pink-600': 'rgb(236, 72, 153)',
    'from-orange-400 to-orange-600': 'rgb(249, 115, 22)',
    'from-green-400 to-green-600': 'rgb(74, 222, 128)',
    'from-indigo-400 to-indigo-600': 'rgb(129, 140, 248)',
    'from-yellow-400 to-yellow-600': 'rgb(250, 204, 21)',
    'from-teal-400 to-teal-600': 'rgb(45, 212, 191)',
    'from-red-400 to-red-600': 'rgb(248, 113, 113)'
  };

  roadmapItems: RoadmapItem[] = [
    {
      year: 2020,
      month: 'April',
      title: 'Started My Journey',
      description: 'Began creating content and building my online presence.',
      icon: this.faRocket,
      completed: true,
      color: 'from-blue-400 to-blue-600',
      animationState: 'normal'
    },
    {
      year: 2021,
      month: 'September',
      title: 'First Brand Collaboration',
      description: 'Partnered with national brand for content creation.',
      icon: this.faHandshake,
      completed: true,
      color: 'from-purple-400 to-purple-600',
      animationState: 'normal'
    },
    {
      year: 2021,
      month: 'December',
      title: 'Reached 100K Facebook Followers',
      description: 'Achieved 100,000+ followers across social media platforms.',
      icon: this.faUsers,
      color: 'from-pink-400 to-pink-600',
      completed: true,
      animationState: 'normal'
    },
    {
      year: 2022,
      month: 'January',
      title: 'Launched YouTube Channel',
      description: 'Started creating video content on YouTube.',
      icon: this.faPlayCircle,
      completed: true,
      color: 'from-orange-400 to-orange-600',
      animationState: 'normal'
    },
    {
      year: 2022,
      month: 'April',
      title: 'Dropped Our Most Viral Content',
      description: 'Created content that went viral, reaching over 8.4M+ views.',
      icon: this.faCode,
      color: 'from-green-400 to-green-600',
      completed: true,
      animationState: 'normal'
    },
    {
      year: 2022,
      month: 'November',
      title: 'Developed New Content Strategies',
      description: 'Participated workshops on content creation and social media strategy.',
      icon: this.faChartLine,
      color: 'from-indigo-400 to-indigo-600',
      completed: true,
      animationState: 'normal'
    },
    {
      year: 2023,
      month: 'October',
      title: 'Established Brand Identity',
      description: 'Developed a consistent brand image and style guide.',
      icon: this.faPalette,
      completed: true,
      color: 'from-yellow-400 to-yellow-600',
      animationState: 'normal'
    },
    {
      year: 2024,
      month: 'Ongoing',
      title: 'Creative Direction',
      description: 'Experimenting different generes',
      icon: this.faLightbulb,
      color: 'from-teal-400 to-teal-600',
      completed: false,
      animationState: 'normal'
    },
    {
      year: 2024,
      month: 'Present-Future',
      title: 'Expanding Horizons',
      description: 'Planning to explore new platforms and content formats.',
      icon: this.faGlobe,
      color: 'from-red-400 to-red-600',
      completed: false,
      animationState: 'normal'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Initialize with animation states
    this.roadmapItems = this.roadmapItems.map((item, index) => ({
      ...item,
      delay: index * 200,
      animationState: 'hidden'
    }));
    
    // Add scroll listener for animations
    this.scrollHandler = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.scrollHandler);
    
    // Add resize listener
    this.resizeHandler = this.handleResize.bind(this);
    window.addEventListener('resize', this.resizeHandler);
    
    // Initial check for elements in view
    setTimeout(() => {
      this.checkRoadmapVisibility();
      this.initMilestoneAnimations();
    }, 500);
  }
  
  ngOnDestroy(): void {
    // Clean up event listeners
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
  }
  
  handleScroll(): void {
    this.checkRoadmapVisibility();
    this.animateMilestonesInView();
  }
  
  handleResize(): void {
    // Re-check positions on resize
    this.checkRoadmapVisibility();
  }
  
  checkRoadmapVisibility(): void {
    const roadmapSection = document.querySelector('#roadmap');
    if (roadmapSection) {
      this.isRoadmapInView = this.isElementInViewport(roadmapSection);
    }
  }
  
  initMilestoneAnimations(): void {
    // Set initial state of all milestones
    setTimeout(() => {
      this.roadmapItems.forEach((item, index) => {
        item.animationState = 'visible';
      });
    }, 100);
  }
  
  animateMilestonesInView(): void {
    const milestones = document.querySelectorAll('.cyber-milestone');
    const yearMarkers = document.querySelectorAll('.cyber-year-marker');
    
    milestones.forEach((milestone, index) => {
      if (this.isElementPartiallyInViewport(milestone)) {
        milestone.classList.add('in-view');
      }
    });
    
    yearMarkers.forEach((marker) => {
      if (this.isElementPartiallyInViewport(marker)) {
        marker.classList.add('animate');
      }
    });
  }
  
  isElementInViewport(el: Element): boolean {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  isElementPartiallyInViewport(el: Element): boolean {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    // Element is partially visible when at least part of it is in the viewport
    const verticallyVisible = (rect.top <= windowHeight) && (rect.bottom >= 0);
    const horizontallyVisible = (rect.left <= windowWidth) && (rect.right >= 0);
    
    return verticallyVisible && horizontallyVisible;
  }
  
  shouldShowYear(index: number): boolean {
    // Only show year for the first item in each year group
    if (index === 0) return true;
    return this.roadmapItems[index].year !== this.roadmapItems[index - 1].year;
  }
  
  getMilestoneColor(colorClass: string): string {
    return this.colorMap[colorClass] || 'rgb(59, 130, 246)';
  }
  
  getUniqueYears(): number[] {
    // Get unique years from roadmap items for progress bar markers
    return [...new Set(this.roadmapItems.map(item => item.year))];
  }
  
  getYearPosition(year: number): number {
    // Calculate position percentage for year markers on progress bar
    const startYear = Math.min(...this.getUniqueYears());
    const endYear = Math.max(...this.getUniqueYears());
    const totalYears = endYear - startYear;
    
    if (totalYears === 0) return 0;
    return ((year - startYear) / totalYears) * 100;
  }
  
  getProgressPercentage(): number {
    const completed = this.roadmapItems.filter(item => item.completed).length;
    return Math.round((completed / this.roadmapItems.length) * 100);
  }
}
