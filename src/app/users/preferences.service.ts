import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  static KEY_LANG = 'LANG';
  static KEY_DISPLAY_MODE = 'light';

  selectedLang(): string {
    return localStorage.getItem(PreferencesService.KEY_LANG) || 'en';
  }

  setLang(lang: string): void {
    localStorage.setItem(PreferencesService.KEY_LANG, lang);
  }
}