import { Component } from '@angular/core';
import { PostCardComponent } from '../post-card/post-card.component';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [PostCardComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent {

}
