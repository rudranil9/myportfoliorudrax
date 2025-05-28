import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

interface Testimonial {
  name: string;
  profileImage: string;
  review: string;
  rating: number;
}

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {
  isCarouselReady = false;
  testimonials: Testimonial[] = [
    {
      name: "Abhrajit Sen ",
      profileImage: "assets/images/testimonials/placeholder1.jpg",
      review: "আমার রুদ্রদার কথা গুলো খুবই ভাল লাগে।খুব সুন্দর লাগে। এত politely বলেন। সত্যি খুব সুন্দর। আমি সবসময় তোমার ভিডিও গুলো দেখি রুদ্রদা। প্রত্যেকটা ভিডিওই খুব ভালো লাগে।❤️❤️❤️❤️",
      rating: 5
    },
    {
      name: "Sipra Das Banik ",
      profileImage: "assets/images/testimonials/placeholder2.jpg",
      review: "Best Content, You Have The Potential, Keep Making More Videos!",
      rating: 5
    },
    {
      name: "Malay Das",
      profileImage: "assets/images/testimonials/placeholder3.jpg",
      review: "Nice Work! Keep Going..",
      rating: 5
    },
      {
      name: "Sourav Goswami",
      profileImage: "assets/images/testimonials/placeholder4.jpg",
      review: "নতুন ফলোয়ার। ধন্যবাদ। আরও সু সংবদ্ধ এই রকম বহু প্রকার বিষয়ে তথ্য বহুল ভিডিও চাই। ১০০% রেকমেন্ড করছি। শুভেচ্ছা ও শুভকামনা রইল। দণ্ডবৎ প্রণাম।",
      rating: 5
    }
  ];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'], // Simple navigation text
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      1200: {
        items: 3
      }
    },
    nav: true, // Enable navigation
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    autoWidth: false,
    margin: 20,
    lazyLoad: false
  };

  constructor() { }

  ngOnInit(): void {
    // Set a small timeout to ensure the carousel is properly initialized
    setTimeout(() => {
      this.isCarouselReady = true;
    }, 100);
  }
}
