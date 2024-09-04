import { Component } from '@angular/core';
import { PostCardComponent } from "../post-card/post-card.component";
import { MenuComponent } from "../../shared/menu/menu.component";

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostCardComponent, MenuComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {
  
}
