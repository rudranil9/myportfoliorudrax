import { Component } from '@angular/core';
import { trigger, style, transition, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        query('.project-card', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(200, [
            animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ProjectsComponent {
  projects = [
    {
      title: 'YouTube Channel',
      description: 'Successfully grew my infotainment YouTube channel to 8K+ subscribers.',
      image: 'assets/projects/YT.jpg',
      link: 'https://youtube.com/@yourchannel'
    },
    {
      title: 'Facebook Page',
      description: 'Launched engaging Facebook campaigns that increased page followers and engagement significantly.',
      image: 'assets/projects/FB.jpg', // Ensure this file exists under assets/projects/
      link: 'https://facebook.com/yourprofile'
    },
    {
      title: 'Instagram Profile',
      description: 'Created viral Instagram reels, driving massive engagement and follower growth.',
      image: 'assets/projects/IG.jpg', // Ensure this file exists under assets/projects/
      link: 'https://instagram.com/yourprofile'
    }
  ];

  constructor() {
    console.log('Projects Loaded:', this.projects);
  }
}
