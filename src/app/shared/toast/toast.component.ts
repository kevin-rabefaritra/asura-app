import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent implements OnInit, OnDestroy {

  static TIMER_DURATION = 5000;
  
  isVisible: WritableSignal<boolean> = signal(false);
  message: WritableSignal<string> = signal('');

  toastMessageSubscription$?: Subscription;
  autoDismissTimeoutSubscription$?: Subscription;

  constructor(
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initSubscription();
  }

  private initSubscription(): void {
    this.toastMessageSubscription$ = this.toastService.toastSubject().subscribe({
      next: (value) => {
        this.display(value);
      }
    });
  }

  /**
   * Displays a message as a toast notification
   * @param message 
   */
  private display(message: string): void {
    this.message.set(message);
    this.isVisible.set(true);
    this.startAutoDismissCountdown();
  }

  ngOnDestroy(): void {
    this.toastMessageSubscription$?.unsubscribe();
    this.autoDismissTimeoutSubscription$?.unsubscribe();
  }

  dismiss(): void {
    this.autoDismissTimeoutSubscription$?.unsubscribe();
    this.isVisible.set(false);
    this.message.set('');
  }

  startAutoDismissCountdown(): void {
    this.autoDismissTimeoutSubscription$ = timer(ToastComponent.TIMER_DURATION).subscribe({
      next: () => {
        this.dismiss();
      }
    });
  }
}
