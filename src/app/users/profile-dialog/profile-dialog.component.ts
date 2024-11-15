import { Component, EventEmitter, OnDestroy, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../shared/toast/toast.service';

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

  deleteAccountStepNumber: WritableSignal<number> = signal(0);
  deleteAccountText: WritableSignal<string> = signal($localize`Delete my account`);
  deleteAccountLoading: WritableSignal<boolean> = signal(false);

  userInfoSubscription$?: Subscription;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastService: ToastService
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

  /**
   * Delete the current user's account
   * @returns 
   */
  deleteAccount(): void {
    if (this.deleteAccountLoading()) {
      return;
    }

    this.deleteAccountLoading.set(true);
    this.userService.deleteCurrentUser().subscribe({
      next: () => {
        this.router.navigate(['/signout']);
        this.onDismiss.emit();
        this.toastService.notify($localize`Your account has been deleted.`);
      }
    });
  }

  deleteAccountClicked(): void {
    let textList = [
      $localize`Delete my account`,
      $localize`Are you sure? All your data will be deleted.`,
      $localize`Sure sure sure?`
    ];
    this.deleteAccountStepNumber.update(v => v + 1);
    if (this.deleteAccountStepNumber() < textList.length) {
      this.deleteAccountText.set(textList[this.deleteAccountStepNumber()]);
    }
    else {
      this.deleteAccount();
    }
  }
}
