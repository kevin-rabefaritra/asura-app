import { Component, EventEmitter, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preferences-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './preferences-dialog.component.html',
  styleUrl: './preferences-dialog.component.css'
})
export class PreferencesDialogComponent implements OnInit {

  @Output() onDismiss: EventEmitter<any> = new EventEmitter();

  selectedLang: WritableSignal<string> = signal('en');
  currentLang?: string;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.currentLang = $localize.locale || 'en';
    this.selectedLang.set(this.currentLang);
  }

  dismiss(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onDismiss.emit();
    }
  }

  applyChanges(): void {
    let selectedLang = this.selectedLang();
    if (selectedLang === this.currentLang) {
      return;
    }
    
    // redirect the user to the relevant subdirectory
    let currentUrl = this.router.url;
    document.location = `/${selectedLang}${currentUrl}`;
  }
}
