import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  notificationSubject?: Subject<string>;

  notify(message: string): void {
    this.notificationSubject?.next(message);
  }

  toastSubject(): Subject<string> {
    if (!this.notificationSubject) {
      this.notificationSubject = new Subject<string>();
    }
    return this.notificationSubject;
  }
}