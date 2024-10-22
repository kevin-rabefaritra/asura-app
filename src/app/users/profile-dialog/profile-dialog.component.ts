import { Component, EventEmitter, OnDestroy, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-dialog',
  standalone: true,
  imports: [],
  templateUrl: './profile-dialog.component.html',
  styleUrl: './profile-dialog.component.css'
})
export class ProfileDialogComponent implements OnInit, OnDestroy {

  @Output() onDismiss: EventEmitter<any> = new EventEmitter();

  userInfo: WritableSignal<User | null> = signal(null);

  userInfoSubscription$?: Subscription;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userInfoSubscription$ = this.userService.getUserInfo().subscribe({
      next: (value) => {
        this.userInfo.set(value);
      }
    });
  }

  ngOnDestroy(): void {
    this.userInfoSubscription$?.unsubscribe();
  }

  dismiss(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onDismiss.emit();
    }
  }
}
