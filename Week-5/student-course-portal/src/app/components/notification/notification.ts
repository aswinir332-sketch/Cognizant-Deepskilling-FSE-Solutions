import { Component } from '@angular/core';

import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.html',
  styleUrl: './notification.css',

  // A separate NotificationService object is created for this component
  // and its child components.
  providers: [NotificationService]
})
export class Notification {

  constructor(public notificationService: NotificationService) {}

  addNotification(): void {
    this.notificationService.addMessage(
      'You have successfully enrolled in a course.'
    );
  }

  clearNotifications(): void {
    this.notificationService.clearMessages();
  }
}