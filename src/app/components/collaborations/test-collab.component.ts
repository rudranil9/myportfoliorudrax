import { Component } from '@angular/core';

@Component({
  selector: 'app-test-collab',
  template: `
    <div style="padding: 20px; background-color: #f0f0f0; border: 2px solid #333; margin: 20px;">
      <h2>Test Collaborations Component</h2>
      <p>This is a test to see if the collaborations component is working.</p>
      <app-collaborations></app-collaborations>
    </div>
  `
})
export class TestCollabComponent {}
