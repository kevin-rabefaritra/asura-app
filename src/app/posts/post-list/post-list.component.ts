import { Component } from '@angular/core';
import { PostCardComponent } from "../post-card/post-card.component";

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostCardComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {
  
}
