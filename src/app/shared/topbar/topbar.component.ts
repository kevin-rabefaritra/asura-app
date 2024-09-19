import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {

  query: string = '';

  constructor(
    private router: Router
  ) {}

  search(): void {
    this.router.navigate(['/search'], {queryParams: {q: this.query}});
  }
}
