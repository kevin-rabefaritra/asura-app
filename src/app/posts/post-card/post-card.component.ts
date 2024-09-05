import { Component } from '@angular/core';
import { PostTagComponent } from "../post-tag/post-tag.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [PostTagComponent, RouterModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {

}
