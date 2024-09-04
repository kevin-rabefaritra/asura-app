import { Component } from '@angular/core';
import { PostTagComponent } from "../post-tag/post-tag.component";

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [PostTagComponent],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {

}
