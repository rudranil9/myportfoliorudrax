import { Component, AfterViewInit } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit {
  timelineItems = [
    { 
      year: '2020', 
      event: 'Started my content creation journey, focusing on infotainment videos that blend education with entertainment.'
    },
    { 
      year: '2021', 
      event: 'Crossed 100K followers on Facebook and 2K subscribers on YouTube with consistent high-quality content.'
    },
    { 
      year: '2022', 
      event: 'Expanded to Instagram reaching 3K followers. Collaborated with educational platforms and brands for sponsored content.'
    },
    { 
      year: '2023', 
      event: 'Reached 250K Facebook followers and 6K YouTube subscribers. Featured in major media outlets for innovative content approach.'
    },
    { 
      year: '2024', 
      event: 'Achieved 325K+ followers on Facebook, 8K+ YouTube subscribers, and 5.5K+ Instagram followers. Expanding into long-form educational series.'
    }
  ];

  skills = [
    { name: 'Video Production', level: 95 },
    { name: 'Storytelling', level: 90 },
    { name: 'Social Media Management', level: 85 },
    { name: 'Content Strategy', level: 88 },
    { name: 'Audience Engagement', level: 92 }
  ];

  ngAfterViewInit(): void {
    gsap.from('.about-section', {
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 80%',
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.timeline-item', {
      scrollTrigger: {
        trigger: '.timeline',
        start: 'top 85%',
      },
      opacity: 0,
      x: -50,
      stagger: 0.3,
      duration: 0.8,
      ease: 'power3.out'
    });

    gsap.from('.skill-bar-fill', {
      scrollTrigger: {
        trigger: '.skills-section',
        start: 'top 85%',
      },
      width: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out'
    });
  }
}
