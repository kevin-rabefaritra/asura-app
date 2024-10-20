import { Component, EventEmitter, OnDestroy, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { interval, Subscription } from 'rxjs';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-verify-account-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './verify-account-dialog.component.html',
  styleUrl: './verify-account-dialog.component.css'
})
export class VerifyAccountDialogComponent implements OnInit, OnDestroy {

  static VERIFICATION_CODE_LENGTH: number = 6;

  @Output() onVerificationSuccess: EventEmitter<any> = new EventEmitter();
  @Output() onSkipClicked: EventEmitter<any> = new EventEmitter();

  verifyAccountForm?: FormGroup;

  errorMessage: WritableSignal<string> = signal('');
  isLoading: WritableSignal<boolean> = signal(false);
  codeRequestCooldown: WritableSignal<number> = signal(0);

  userInfo: WritableSignal<User | null> = signal(null);

  userInfoSubscription$?: Subscription;
  codeRequestCooldownSubscription$?: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUserInfo();
  }

  ngOnDestroy(): void {
    this.userInfoSubscription$?.unsubscribe();
    this.codeRequestCooldownSubscription$?.unsubscribe();
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

  private startCooldown(waitingTime: number): void {
    this.codeRequestCooldown.set(waitingTime);
    this.codeRequestCooldownSubscription$ = interval(1000).subscribe(
      () => {
        if (this.codeRequestCooldown() > 0) {
          this.codeRequestCooldown.update((v) => v - 1);
        }
        else {
          this.codeRequestCooldownSubscription$?.unsubscribe();
        }
      }
    );
  }

  requestCode(): void {
    this.accountService.requestCode().subscribe({
      next: (value) => {
        this.startCooldown(value.cooldown);
      },
      error: (err) => {
        if (err.status === 403) { // Forbidden
          this.startCooldown(err.error.cooldown);
          this.errorMessage.set('Please wait before you can request another verification code.');
        }
        else {
          this.errorMessage.set(`An error occured. ${err.statusText}`);
        }
      }
    });
  }

  verifyCode(): void {
    if (!this.verifyAccountForm || this.verifyAccountForm.invalid) {
      return;
    }

    const formValues = this.verifyAccountForm.getRawValue();
    this.accountService.checkCode(formValues.verificationCode).subscribe({
      next: () => {
        this.onVerificationSuccess.emit();
      },
      error: (err) => {
        console.log(err);
        if (err.status === 400) {
          this.errorMessage.set(err.error.message);
        }
        else {
          this.errorMessage.set(`An error occured. ${err.statusText}`);
        }
      },
    })
  }

  skip(): void {
    this.onSkipClicked.emit();
  }
}
