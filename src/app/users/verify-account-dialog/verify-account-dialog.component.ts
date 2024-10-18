import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-verify-account-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './verify-account-dialog.component.html',
  styleUrl: './verify-account-dialog.component.css'
})
export class VerifyAccountDialogComponent implements OnInit, OnDestroy {

  static VERIFICATION_CODE_LENGTH: number = 6;

  verifyAccountForm?: FormGroup;

  errorMessage: WritableSignal<string> = signal('');
  isLoading: WritableSignal<boolean> = signal(false);

  userInfo: WritableSignal<User | null> = signal(null);

  userInfoSubscription$?: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUserInfo();
  }

  ngOnDestroy(): void {
    this.userInfoSubscription$?.unsubscribe();
  }

  private initForm(): void {
    const verificationCodeLength = VerifyAccountDialogComponent.VERIFICATION_CODE_LENGTH;
    this.verifyAccountForm = this.formBuilder.group({
      verificationCode: ['', [Validators.required, Validators.maxLength(verificationCodeLength), Validators.minLength(verificationCodeLength)]]
    });
  }

  private loadUserInfo(): void {
    // Load user info
    this.userInfoSubscription$ = this.userService.getUserInfo().subscribe({
      next: (value) => {
        this.userInfo.set(value);
      }
    });
  }

  verify(): void {

  }
}
