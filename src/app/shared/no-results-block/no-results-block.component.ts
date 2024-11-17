import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-no-results-block',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './no-results-block.component.html',
  styleUrl: './no-results-block.component.css'
})
export class NoResultsBlockComponent {

  @Input({ required: false }) query?: string;

  constructor(
    private router: Router
  ) {}

  get isHome(): boolean {
    return this.router.url === '/home';
  }
}
