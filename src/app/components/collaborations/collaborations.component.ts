import { Component } from '@angular/core';
import { faHandshake, faChevronDown, faTimes, faPlayCircle, faStar } from '@fortawesome/free-solid-svg-icons';

interface Collaboration {
  title: string;
  logoUrl: string;
  type: string;
  description: string;
  fullDescription: string;
  videoUrl: string;
  highlights: string[];
}

@Component({
  selector: 'app-collaborations',
  templateUrl: './collaborations.component.html',
  styleUrls: ['./collaborations.component.scss']
})
export class CollaborationsComponent {
  // FontAwesome icons
  faHandshake = faHandshake;
  faChevronDown = faChevronDown;
  faTimes = faTimes;
  faStar = faStar;
  faPlayCircle = faPlayCircle;

  // Collaboration data
  collaborations: { [key: string]: Collaboration } = {
  rapido: {
    title: 'Rapido',
    logoUrl: 'assets/images/brands/rapido-logo.png',
    type: 'Bike Taxi Service',
    description: 'Created an integrated promotional video for Rapido’s bike taxi app with real-life user context.',
    fullDescription: 'Collaborated with Rapido on an integrated video campaign promoting their bike taxi service app. The content showcased the ease of use, affordability, and daily utility of the app through engaging narration and relatable storytelling tailored for urban commuters.',
    videoUrl: 'https://www.facebook.com/watch/?v=621208182792238',
    highlights: [
      'Integrated App Promotion',
      'Real-Life Scenarios Highlighted',
      'Simplified Urban Mobility Messaging'
    ]
  },
  cashkaro:{ 
    title: 'Cashkaro',
    logoUrl: 'assets/images/brands/cashkaro-logo.png',
    type: 'E-commerce',
    description: 'Promoted CashKaro’s cashback app and educated viewers on how to earn rewards while shopping online.',
    fullDescription: 'Partnered with CashKaro to create content promoting their cashback platform. The video explained how users can earn cashback by shopping via CashKaro on platforms like Amazon and Flipkart—either by using my referral link or by accessing these marketplaces through the CashKaro website or app.',
    videoUrl:' https://www.facebook.com/watch/?v=631532111360339',
    highlights: [
      'Explained Cashback Process Clearly',
      'Boosted App Visibility through Demonstration',
      'Built Trust with Honest, Value-Driven Content'
    ]
  },
  camellia: {
    title: 'Camellia Productions',
    type: 'Movie Promotion',
    description: 'Promoted the Bengali film "Mission Everest" through a dedicated cinematic video.',
    fullDescription: 'Worked with Camellia Productions on the promotion of "Mission Everest", a Bengali feature film. Developed a dedicated video campaign that focused on building curiosity and emotional connection with the audience, using powerful visuals and thematic storytelling.',
    highlights: [
      'Tailored Film Content',
      'Emotional Narrative Style',
      'Boosted Pre-release Buzz'
    ],
    logoUrl: 'assets/images/brands/camellia-logo.png',
    videoUrl: ' https://www.facebook.com/watch/?v=675077110128524',
  },
  bongfest: {
    title: 'Bong Fest',
    type: 'Event Collaboration',
    description: 'Promoted Bong Fest and actively participated in BHOKATTA VOLUME 1 Tour in Rishikhola.',
    fullDescription: 'Partnered with Bong Fest to promote their cultural event, with a special focus on the BHOKATTA VOLUME 1 Tour held in Rishikhola. The content celebrated Bengali culture, food, and art while capturing the energy and spirit of the live tour through immersive storytelling and on-location experiences.',
    highlights: [
      'Cultural Representation with Heart',
      'On-Ground Participation in Rishikhola',
      'Promoted Heritage through Entertainment'
    ],
    logoUrl: 'assets/images/brands/bongfest-logo.png',
    videoUrl: ' https://www.facebook.com/watch/?v=299210499877670',
  },
  cesc: {
    title: 'CESC Limited',
    type: 'Corporate Partnership',
    description: 'Lent my voice to an awareness campaign about energy sustainability and responsible electricity use.',
    fullDescription: 'Worked with CESC Limited on a voiceover project focused on sustainability and responsible energy consumption. The campaign aimed to raise public awareness on how small daily changes can lead to better energy efficiency and a more sustainable future.',
    highlights: [
      'Voiceover for Public Awareness',
      'Focused on Responsible Energy Use',
      'Simplified Sustainability Messaging'
    ],
    logoUrl: 'assets/images/brands/cesclogo.png',
    videoUrl: 'https://www.facebook.com/CESCLtd/videos/1018696846861871/?rdid=jG3bEf7MzMg6OZcX#'
  }
};


  // Selected collaboration for modal
  selectedCollab: Collaboration | null = null;

  // Toggle card and open modal
  toggleCard(key: string): void {
    this.selectedCollab = this.collaborations[key];
  }

  // Close modal
  closeModal(): void {
    this.selectedCollab = null;
  }

  // Open video link
  openVideo(url: string): void {
    window.open(url, '_blank');
  }

  // Helper method to get object keys
  objectKeys = Object.keys;
}
