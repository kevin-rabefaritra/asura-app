import { Component, Input, OnInit, signal, Signal } from '@angular/core';
import { PostCardComponent } from '../post-card/post-card.component';
import { PostService } from '../post.service';
import { Post } from '../post.model';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [PostCardComponent, SpinnerComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent implements OnInit {

  @Input({ required: true }) reference!: string;

  post = signal<Post | undefined>(undefined);

  constructor(
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.loadPost();
  }

  private loadPost(): void {
    this.postService.findByReference(this.reference).subscribe({
      next: (value) => {
        this.post.set(value);
      }
    });
  }
}
