import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent implements OnInit {

  query: string = '';

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initEventSubscription();
  }

  initEventSubscription(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let route = this.router.url.toString();
        if (!route.startsWith('/search')) {
          this.query = '';
        }
      }
    });
  }

  search(): void {
    this.router.navigate(['/search'], {queryParams: {q: this.query}});
  }
}
